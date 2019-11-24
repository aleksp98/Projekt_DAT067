import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/User';

class UserList extends Component {

    constructor() {
        super();
        this.state = {};
        this.onUserSelect = this.onUserSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestUsers();
    }

    updateProperty(property, value) {
        let user = this.state.user;
        user[property] = value;
        this.setState({ user: user });
    }

    onUserSelect(e) {
        this.newUser = false;
        this.setState({
            displayDialog: true,
            user: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newUser = true;
        this.setState({
            user: { email: '', password: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveUser(this.state.user);
        this.dialogHide();
        this.growl.show({
            severity: 'success', detail: this.newUser ?
                "Data Saved Successfully" : "Data Updated Successfully"
        });
    }

    delete() {
        this.props.deleteUser(this.state.user.id);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Data Deleted Successfully" });
    }

    render() {

        let header = <div className="p-clearfix"
            style={{ lineHeight: '1.87em' }}>CRUD for Users </div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Add"
                icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Close" icon="pi pi-times" onClick={this.dialogHide} />
            <Button label="Delete" disabled={this.newUser ? true : false}
                icon="pi pi-times" onClick={this.delete} />
            <Button label={this.newUser ? "Save" : "Update"} icon="pi pi-check"
                onClick={this.save} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.props.users} selectionMode="single"
                    header={header} footer={footer}
                    selection={this.state.selectedUser}
                    onSelectionChange={e => this.setState
                        ({ selectedUser: e.value })} onRowSelect={this.onUserSelect}>
                    <Column field="id" header="ID" />
                    <Column field="email" header="Email" />
                    <Column field="password" header="Password" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }}
                    header="User Details" modal={true} footer={dialogFooter}
                    onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.user &&

                        <div className="p-grid p-fluid">

                            <div style={{ paddingTop: '10px' }}>
                                <label htmlFor="id">ID</label></div>
                            <div>
                                <InputText id="id" disabled value={this.state.user.id} />
                            </div>

                            <div style={{ paddingTop: '10px' }}>
                                <label htmlFor="email">Email</label></div>
                            <div>
                                <InputText id="email" onChange={(e) => { this.updateProperty('email', e.target.value) }}
                                    value={this.state.user.email} />
                            </div>

                            <div style={{ paddingTop: '10px' }}>
                                <label htmlFor="password">Password</label></div>
                            <div>
                                <InputText id="password" onChange={(e) => { this.updateProperty('password', e.target.value) }}
                                    value={this.state.user.password} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Make users array available in  props
function mapStateToProps(state) {
    return {
        users: state.users.users,
        loading: state.users.loading,
        errors: state.users.errors,
        forceReload: state.users.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(UserList);