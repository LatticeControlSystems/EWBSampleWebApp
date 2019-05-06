import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "reactstrap";
import { Container, Row, Col, Alert } from "reactstrap";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  UncontrolledCarousel
} from 'reactstrap';
import { Link } from "react-router-dom";

import { graphql, compose, withApollo } from "react-apollo";
import QueryAllEvents from "../GraphQL/QueryAllEvents";
import MutationDeleteEvent from "../GraphQL/MutationDeleteEvent";

import moment from "moment";
const items = [
  {
    src: require('../Images/1.jpg'),
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: require('../Images/2.jpg'),
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: require('../Images/3.jpg'),
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  onExiting() {
  this.animating = true;
}

onExited() {
  this.animating = false;
}

next() {
  if (this.animating) return;
  const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
  this.setState({ activeIndex: nextIndex });
}

previous() {
  if (this.animating) return;
  const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
  this.setState({ activeIndex: nextIndex });
}

goToIndex(newIndex) {
  if (this.animating) return;
  this.setState({ activeIndex: newIndex });
}

    state = {
        busy: false,
    }

    static defaultProps = {
        events: [],
        deleteEvent: () => null,
    }

    async handleDeleteClick(event, e) {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to delete event ${event.id}`)) {
            const { deleteEvent } = this.props;

            await deleteEvent(event);
        }
    }

    handleSync = async () => {
        const { client } = this.props;
        const query = QueryAllEvents;

        this.setState({ busy: true });

        await client.query({
            query,
            fetchPolicy: 'network-only',
        });

        this.setState({ busy: false });
    }

    renderEvent = (event) => (
        <Link to={`/event/${event.id}`} className="card" key={event.id}>
            <div className="content">
                <div className="header">{event.name}</div>
            </div>
            <div className="content">
                <p><i className="icon calendar"></i>{moment(event.when).format('LL')}</p>
                <p><i className="icon clock"></i>{moment(event.when).format('LT')}</p>
                <p><i className="icon marker"></i>{event.where}</p>
            </div>
            <div className="content">
                <div className="description"><i className="icon info circle"></i>{event.description}</div>
            </div>
            <div className="extra content">
                <i className="icon comment"></i> {event.comments.items.length} comments
            </div>
            <button className="ui bottom attached button" onClick={this.handleDeleteClick.bind(this, event)}>
                <i className="trash icon"></i>
                Delete
            </button>
        </Link>
    );


    render() {
      const { activeIndex } = this.state;

      const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >
            <img src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
          </CarouselItem>
        );
    });
        const { busy } = this.state;
        const { events } = this.props;
        var url="url('https://www.sciencealert.com/images/2018-05/processed/super_heated_water_1024.jpg')";
        var url21="url('https://www.riversideca.gov/utilities/images/badge-catdrinkswater.jpg')";

        var pictureURL ="url('http://www.libelium.com/wp-content/uploads/2018/07/iStock-639267164_290.jpg')";

        var localImage = require('../Images/waterline.jpg');
        return (
          <Container>

            <Row>

              <Col xs={12} style={{padding: '0px', height:'395px'}}>

              <UncontrolledCarousel items={items} />
                </Col>


              </Row>
              <Row>
              <Col xs={12} style={{padding: '0px', height:'30vh', backgroundColor: 'black'}}>
              <h1 style={{fontsize: '50%'}}>Long range capabilities</h1>
              <p>Our hardware is specially designed to cover long ranges via a single network access point. Greatly reducing operating costs in terms of network
              coverage. This is especially important when there is a need to monitor water quality over vast areas.</p>
              <body>
              Our hardware is specially designed to cover long ranges via a single network access point. Greatly reducing operating costs in terms of network
              coverage.
              </body>



              </Col>
              </Row>
              <Row>
              <Col xs={12} style={{padding: '0px', height:'30vh'}}>
              <h1>Machine Learning Integration</h1>
              <p>Our system allows for</p>
              <p>Up to 20% less wasted water</p>

              </Col>
              </Row>
              <Row>
              <Col xs={12} style={{padding: '0px', height:'30vh'}}>
              <h1>Industrial Automation</h1>
              <p>Smart water tech can save +$12 billion annually</p>


              </Col>
              </Row>
              <Row>
              <Col xs={12} style={{padding: '0px', height:'30vh'}}>
              <h1>Live Data visualization</h1>
              <p>Our software allows you to
              </p>


              </Col>
              </Row>
              </Container>
        );
    }

}

export default withApollo(compose(
    graphql(
        QueryAllEvents,
        {
            options: {
                fetchPolicy: 'cache-first',
                variables: { limit: 1000 },
            },
            props: ({ data: { listEvents = { items: [] } } }) => ({
                events: listEvents.items
            })
        }
    ),
    graphql(
        MutationDeleteEvent,
        {
            options: {
                update: (proxy, { data: { deleteEvent } }) => {
                    const query = QueryAllEvents;
                    const data = proxy.readQuery({ query });

                    data.listEvents.items = data.listEvents.items.filter(event => event.id !== deleteEvent.id);

                    proxy.writeQuery({ query, data });
                }
            },
            props: (props) => ({
                deleteEvent: (event) => {
                    return props.mutate({
                        variables: { id: event.id },
                        optimisticResponse: () => ({
                            deleteEvent: {
                                ...event, __typename: 'Event', comments: { __typename: 'CommentConnection', items: [] }
                            }
                        }),
                    });
                }
            })
        }
    )
)(HomePage));
