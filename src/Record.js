import React from "react";

export default class Permissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            havePermissions: false,
        };
        this.checkPermissions = this.checkPermissions.bind(this);
    }

    checkPermissions() {
        const permissions = navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        permissions.then((stream) => {
            alert('accepted the permissions');
            this.setState(((prevState) => {
                // havePermissions: !prevState.havePermissions
            }));
        })
            .catch((err) => {
                this.setState(((prevState) => {
                    // havePermissions: false
                }));
                console.log(`${err.name} : ${err.message}`)
            });
    }
}