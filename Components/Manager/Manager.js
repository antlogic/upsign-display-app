import * as React from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { connect } from "react-redux";
import Code from "../Code/Code";
import * as actions from "../../store/actions";

class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: false,
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.loggedIn !== this.props.loggedIn){
            this.setState({authorized: this.props.loggedIn})
        }
        if(this.state.authorized != prevState.authorized){
            const config = {
                headers:{
                    Authorization: "Bearer " + this.props.accessToken
                }
            };
            this.props.getImages(config);
        }
    }


    render() {
        const url = this.props.ready ? this.props.images[0].url : "";
        return (
            <View >
                {this.state.authorized ?
                    <Image
                        style={{width: 500, height: 500}}
                        source={
                            {
                                uri: url
                            }
                        }
                    /> : <Code />}

                <Text>My URL: {url}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        loggedIn: state.loggedIn,
        accessToken: state.accessToken,
        images: state.images,
        ready: state.imageReady
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addLocations: (to, config) => dispatch(actions.SetRequest(to, config)),
        getImages: (config) => dispatch(actions.getImages(config))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager)