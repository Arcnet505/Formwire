import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

class Graphs extends Component {
    state = {
        all: null,
        render: true
    };

    componentDidMount() {
        var labelsList = [];
        var dataList = [];
        var name;

        //determine graph parameters
        setTimeout(
            function() {
                if (this.props.type === 'all') {
                    name = this.props.name;
                    for (var i = 0; i < this.props.data.length; i++) {
                        var tempDate = new Date(this.props.data[i].formDate);
                        var month = parseInt(tempDate.getMonth()) + 1;
                        labelsList.push(
                            tempDate.getDate() +
                                '/' +
                                month +
                                '/' +
                                tempDate.getFullYear()
                        );
                        var total = 0;
                        for (
                            var j = 0;
                            j < this.props.data[i].formData.length;
                            j++
                        ) {
                            if (
                                this.props.data[i].formData[j].type ===
                                    'radio-group' ||
                                this.props.data[i].formData[j].type === 'number'
                            ) {
                                total += parseInt(
                                    this.props.data[i].formData[j].value
                                );
                            }
                        }
                        dataList.push(total);
                    }
                } else {
                    // above here
                    // for (var i = 0; i < this.props.data.length; i++) {
                    //     labelsList.push(this.props.data[i].date);
                    // }
                    // console.log('data: ');
                    // console.log(this.props.data);
                    // console.log('\ntype: ');
                    // console.log(this.props.type);
                    // console.log('\nquestion: ');
                    // console.log(this.props.question);
                    // labelsList = ['a', 'b', 'c'];
                    // dataList = [1, 2, 3];
                    // below here
                    // name = this.props.question.id;

                    //fill in graph elements
                    var labels = document.querySelectorAll('label');

                    for (var k = 0; k < labels.length; k++) {
                        if (this.props.question.name === labels[k].htmlFor) {
                            name = labels[k].innerText;
                            break;
                        }
                    }

                    if (
                        this.props.question.id.includes('radio-group') ||
                        this.props.question.id.includes('number')
                    ) {
                        for (var i = 0; i < this.props.data.length; i++) {
                            var tempDate = new Date(
                                this.props.data[i].formDate
                            );
                            var month = parseInt(tempDate.getMonth()) + 1;

                            labelsList.push(
                                tempDate.getDate() +
                                    '/' +
                                    month +
                                    '/' +
                                    tempDate.getFullYear()
                            );
                            for (
                                var j = 0;
                                j < this.props.data[i].formData.length;
                                j++
                            ) {
                                if (
                                    this.props.data[i].formData[j].name ===
                                    this.props.question.name
                                ) {
                                    dataList.push(
                                        this.props.data[i].formData[j].value
                                    );
                                    console.log(
                                        this.props.data[i].formData[j].value
                                    );
                                }
                            }
                        }
                    } else {
                        this.setState({
                            render: false
                        });
                    }

                    //graph settings
                    var dataSet = {
                        labels: labelsList,
                        datasets: [
                            {
                                label: name,
                                fill: true,
                                lineTension: 0.3,
                                backgroundColor: 'rgba(225, 204,230, .3)',
                                borderColor: 'rgb(205, 130, 158)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgb(205, 130,1 58)',
                                pointBackgroundColor: 'rgb(255, 255, 255)',
                                pointBorderWidth: 10,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgb(0, 0, 0)',
                                pointHoverBorderColor: 'rgba(220, 220, 220,1)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: dataList
                            }
                        ]
                    };

                    this.setState({
                        all: dataSet
                    });
                }
            }.bind(this),
            400
        );
    }

    render() {
        return (
            <MDBContainer>
                {this.state.render ? (
                    <Line
                        data={this.state.all}
                        options={{ responsive: true }}
                    />
                ) : null}
            </MDBContainer>
        );
    }
}

export default Graphs;
