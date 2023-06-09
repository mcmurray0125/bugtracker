import { useEffect, useState } from 'react'
import { Card, CardHeader, List, ListGroupItem, Badge, Row, Col } from 'reactstrap'
import API from '../../utilities/API';
import Comments from './Comments';

export default function SelectedTicket({projectId, selectedTicket, selectedTicketId, setSelectedTicket, assignedDevs}) {


      return (
        <Card className='mt-4 table-wrapper'>
          <CardHeader className='p-3'>
            <h5 className='dashboard-card-title'>Selected Ticket Info</h5>
          </CardHeader>
          {Object.keys(selectedTicket).length === 0 ? (
            <p className='m-3'>No Ticket Selected</p>
          ) : (
            <Row>
              <Col className='my-3 p-0 px-4'>
                <Card className='p-3'>
                  <Row className='selected-ticket-info mb-4'>
                    <Col md="3">
                      <h6 className='mb-1'>Ticket Title</h6>
                      <h5 className='selected-ticket-title'>{selectedTicket.title}</h5>
                    </Col>
                    <Col md="3">
                      <h6 className='mb-1'>Creator</h6>
                      <h5>{selectedTicket.first_name} {selectedTicket.last_name}</h5>
                    </Col>
                    <Col md="6">
                      <h6 className='mb-1'>Description</h6>
                      <h5>{selectedTicket.description}</h5>
                    </Col>
                  </Row>

                  <Row className='selected-ticket-info'>
                    <Col md="3" sm="12">
                      <h6 className='mb-1'>Status</h6>
                      <Badge pill className='mb-2'>{selectedTicket.status.toUpperCase()}</Badge>
                    </Col>
                    <Col md="3" sm="12">
                      <h6 className='mb-1'>Priority</h6>
                      <Badge pill className='mb-2'>{selectedTicket.priority.toUpperCase()}</Badge>
                    </Col>
                    <Col md="3" sm="12">
                      <h6 className='mb-1'>Type</h6>
                      <Badge pill className='mb-2'>{selectedTicket.type.toUpperCase()}</Badge>
                    </Col>
                    <Col md="3">
                      <h6 className='mb-1'>Time Estimate <small>(Hours)</small></h6>
                      <h5>{selectedTicket.time_estimate}</h5>
                    </Col>
                  </Row>
                  <hr />
                  <List type='unstyled' className='m-0'>
                    <h6 className='mb-1'>Assigned Users</h6>
                    {assignedDevs.length === 0 ? (
                      <ListGroupItem>No users assigned</ListGroupItem>
                    ) : (
                      assignedDevs.map((dev, index) => (
                        <ListGroupItem key={index} disabled className='fs-5'>
                          {dev.first_name} {dev.last_name}
                        </ListGroupItem>
                      ))
                    )}
                  </List>
                </Card>
              </Col>
              <Col className='my-3 p-0 px-4' xl="6">
                <Comments
                  selectedTicket={selectedTicket}
                  selectedTicketId={selectedTicketId}
                  projectId={projectId}
                />
              </Col>
            </Row>
          )}
        </Card>
      );
}
