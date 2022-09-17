import React, { Component } from 'react';

export default class Vehicle extends Component {
    static displayName = Vehicle.name;

    // 1. Constructor sets a list of default strings.
    constructor(props) {
        super(props);
        this.state = { vehicles: [], count: 0, loadingList: false, loadingCount: false, vin: "", loadingCount: false, modelid: "", loadingCount: false, dealershipid: "", loadingCount: false, trimlevel: "" }; 
    }

    // 2. Render the list of default strings to the page with a refresh button. Rest.
    // 4. Render fires and sets the loading message, and awaits another state change.
    // 6. Render fires and updates the page with the new data that has returned. Rest.
    // If the button is clicked again, it starts again from step 3.
    render() {
        // Start thread A.
        let contents = this.state.loadingList || this.state.loadingCount
            ? <p><em>Loading...</em></p>
            : <ul>
                {this.state.vehicles.map(item =>
                    <li key={item.id}>
                        <ul>
                            <li><b>VIN: </b>{item.vin}</li>
                            {/*<li><b>ModelID: </b>{item.modelid}</li>*/}
                            {/*<li><b>DealershipID: </b>{item.dealershipid}</li>*/}
                            <li><b>Trim Level: </b>{item.trimlevel}</li>

                        </ul>




                        <p>
                            <button onClick={(() => { this.removeVehicle(item.id) }).bind(this)}>Delete</button>
                            <button onClick={(() => { this.updateVehicle(item.id) }).bind(this)}>Update</button>
                        </p>
                    </li>
                )
                    // When we click either the delete or update button, it passes "item" (the string in question) into the method. This allows the method to target a specific list item based on which button was clicked.
                }
            </ul>;

        return (
            <div>
                <h1 id="tabelLabel" >EXSM3946 - Assignments </h1>
                <p>This component demonstrates interacting with a .NET API.</p>
                <p>There are currently {this.state.count} items stored in the server's cache.</p>
                {contents}


                <input value={this.state.vin} onChange={(event) => { this.setState({ vin: event.target.value }); }} type="text" placeholder="VIN" /><br />
                {/*<input value={this.state.modelid} onChange={(event) => { this.setState({ modelid: event.target.value }); }} type="text" placeholder="Model ID" /><br />*/}
                {/*<input value={this.state.dealershipid} onChange={(event) => { this.setState({ dealershipid: event.target.value }); }} type="text" placeholder="Dealership ID" /><br />*/}
                <input value={this.state.trimlevel} onChange={(event) => { this.setState({ trimlevel: event.target.value }); }} type="text" placeholder="Trim Level" /><br />

                <button onClick={(() => {
                    // 3. When the button is clicked, set the state loading to true and begin the fetch method. Changing state triggers render to fire.
                    this.setState({ loading: true });
                    this.populateVehicles();
                    // Start thread B.
                    // (Thread A continues)
                    //this.populateDealerships(); 
                    // Start thread C.
                    // (Thread A continues)
                }).bind(this)

                }>Refresh</button>

                <button onClick={(() => { this.setState({ loading: true }); this.addName(); }).bind(this)}>Add </button>
            </div>
        );
        // Thread A ends.
    }

    async addName() {
        // Request params gets converted to the query string (the bit after the question mark).
        let requestParams = {
            vin: this.state.vin,
            //modelid: this.state.modelid,
            //dealershipid: this.state.dealershipid,
            trimlevel: this.state.trimlevel,
        }
        // Request options is used to specify what method the request will use.
        let requestOptions = {
            method: "POST"
        }
        const response = await fetch("vehicle?" + new URLSearchParams(requestParams), requestOptions);

        console.log(response);

        // If we want to refresh the list automatically, all we have to do is call our update methods at the end.
        this.populateCount();
        this.populateVehicles();
    }

    // Remove and update accept a parameter, which is fed by the name of which list item was clicked.
    async removeVehicle(stringToRemove) {
        let requestParams = {
            id: stringToRemove,
            vin: this.state.vin,
            //modelid: this.state.modelid,
            //dealershipid: this.state.dealershipid,
            trimlevel: this.state.trimlevel,

        }
        let requestOptions = {
            method: "DELETE"
        }
        const response = await fetch("vehicle?" + new URLSearchParams(requestParams), requestOptions);

        console.log(response);

        this.populateCount();
        this.populateVehicles();
    }

    async updateVehicle(stringToUpdate) {
        let requestParams = {
            id: stringToUpdate,
            vin: this.state.vin,
            //modelid: this.state.modelid,
            //dealershipid: this.state.dealershipid,
            trimlevel: this.state.trimlevel,

        }
        let requestOptions = {
            method: "PUT"
        }
        const response = await fetch("vehicle?" + new URLSearchParams(requestParams), requestOptions);

        console.log(response);

        this.populateCount();
        this.populateVehicles();
    }

    async populateCount() {
        const responseCount = await fetch('vehicle/count');
        const dataCount = await responseCount.json();
        this.setState({ count: dataCount, loading: false });
        // Thread B ends.
    }

    // 5. Fetch the strings and update the state with the new data and turn off loading when the data gets back.
    async populateVehicles() {
        const responseList = await fetch('vehicle/list');
        const dataList = await responseList.json();
        this.setState({ vehicles: dataList, loading: false });
        // Thread C ends.
    }
}
