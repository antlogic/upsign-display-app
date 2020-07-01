import * as React from 'react';
import {Text, View, Dimensions, Image, StyleSheet, FlatList} from 'react-native';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import styled from "styled-components"
import * as Device from 'expo-device';

class Code extends React.Component {

    /**
     * Returns true of the screen is in landscape mode
     */
    isLandscape = () => {
        const dim = Dimensions.get('screen');
        return dim.width >= dim.height;
    };

    componentDidMount() {
        const config = {
            "isLandscape": this.isLandscape(),
            "manufacturer": Device.manufacturer,
            "model": Device.modelName
        }

        this.props.getCode(config);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.pairCode !== this.props.pairCode){
            this.props.asyncPoll(this.props.pairCode)
        }
    }


    render() {
        return (
            <Container width={Dimensions.get('screen').width}>
                <Text style={{color: "white", fontSize: 20, marginBottom: 10, marginTop: 10}}>Sign In to
                    Upsign</Text>
                <Text style={{color: "white", fontSize: 20, marginBottom: 10, marginTop: 10}}>1. On the admin panel
                    go to </Text>
                <Text
                    style={{color: "white", fontSize: 20, marginBottom: 10, marginTop: 10}}>upsign.com/stores</Text>
                <Text style={{color: "white", fontSize: 20, marginBottom: 10, marginTop: 10}}>2. Inside the desired
                    store click</Text>
                <Text style={{color: "white", fontSize: 20, marginBottom: 10, marginTop: 10}}>Add Display and enter
                    the code below:</Text>
                <Text style={{color: "white", fontSize: 20, marginBottom: 10, marginTop: 10}}>My
                    Token: {this.props.pairCode}</Text>
                <Text style={{color: "white", fontSize: 20, marginBottom: 10, marginTop: 10}}>My Access
                    Token: {this.props.accessToken}</Text>
                <Text style={{color: "white", fontSize: 20, marginBottom: 10, marginTop: 10}}>My
                    Error: {this.props.error}</Text>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        pairCode: state.pairCode,
        accessToken: state.accessToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCode: (config) => dispatch(actions.generateCode(config)),
        asyncPoll: (pairCode) => dispatch(actions.poll(pairCode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Code)

const Container = styled.View`
    flex: 1;
    width: ${props => props.width}px;
    justifyContent: center;
    alignItems: center;
    backgroundColor: black;
`;