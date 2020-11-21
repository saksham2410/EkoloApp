import React, { Component } from "react";

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText
} from "./styles";

import uberx from "../../assets/uberx.png";

export default class Details extends Component {
  render() {
    return (
      <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Comfortable for 1 person</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>Ekolo-bike</TypeTitle>
        <TypeDescription>Rs 60</TypeDescription>

        <RequestButton onPress={() => {}}>
          <RequestButtonText>Confirm Ride</RequestButtonText>
        </RequestButton>
      </Container>
    );
  }
}