import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

class butt extends React.Component {
  state = {
    active: false
  }
  handleOFF = () => {
    this.setState({
      active: false
    });

  }

  handleOn = () => {
    this.setState({
      active: true
    });
  }

  render() {
    return (
      <MainView>
        <Label>
          <LabelOff onPress={this.handleOFF} active={this.state.active} activeOpacity={0.8}>
            <Off>OFF</Off>
          </LabelOff>
          <LabelOn onPress={this.handleOn} active={this.state.active} activeOpacity={0.8}>
            <On>ON</On>
          </LabelOn>
        </Label>
      </MainView>
    )
  }
}


const MainView = styled.View`
  margin:0px;
`
const Label = styled.View`
  height:60px;
  width:60px;
  flex-direction:row;
  justify-content:space-around;
  align-items:center;
  background-color:transparent;
`

const LabelOff = styled.TouchableOpacity`
  height:30px;
  width:30px;
  background-color:${props => props.active ? 'transparent' : '#cb6161'};
  border:2px solid #cb6161;
  border-right-width:0px;
  align-items:center;
  justify-content:space-around;
`
const LabelOn = styled.TouchableOpacity`
  height:30px;
  width:30px;
  background-color:${props => props.active ? '#88d498' : 'transparent'};
  border:2px solid #55acee;
  border-left-width:0px;
  align-items:center;
  justify-content:space-around;
`
const Off = styled.Text`
  font-size:12px;
`
const On = styled.Text`
  font-size:12px;
`
export default butt 