import React, { Component } from 'react';

export default class Dealership extends Component {
    static displayName = Dealership.name;

    // 1. Constructor sets a list of default strings.
    constructor(props) {
        super(props);
        this.state = { dealerships: [], count: 0, loadingList: false, loadingCount: false, id: '', loadingCount: false, name: '', loadingCount: false, manufacturerID: '', loadingCount: false, address: '', loadingCount: false, phoneNumber: '' }; // phonenumber isn't getting picked up!?!--- it is now working due to name casing was wrong.
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
                {this.state.dealerships.map(item =>
                    <li key={item.id}>
                        <ul>
                            <li><b>ID: </b>{item.id}</li>
                            <li><b>Dealership Name: </b>{item.name}</li>
                            <li><b>Manufacturer ID: </b>{item.manufacturerID}</li>
                            <li><b>Address: </b>{item.address}</li>
                            <li><b>Phone Number: </b>{item.phoneNumber}</li>
                        </ul>

                        <p>
                            <button onClick={(() => { this.removeDealership(item.id) }).bind(this)}>Delete</button>
                            <button onClick={(() => { this.updateDealership(item.id) }).bind(this)}>Update</button>
                        </p>
                    </li>
                )
                    // When we click either the delete or update button, it passes "item" (the string in question) into the method. This allows the method to target a specific list item based on which button was clicked.
                }
            </ul>;

        return (
            <div>
                <h1 className="title" id="tabelLabel" >Dealership Informations </h1>
                <h3>Must corrolate with Swagger or Postman to find the determine value!!</h3>
                <p><span>Please make sure to fill in the blanks accordingly. The ID will auto generate so only Name, Manufacturer, Address, and Phone Number is needed.</span></p>
                <p>There are currently {this.state.count} items stored in the server's cache.</p>
                {contents}

                {/*<input value={this.state.id} onChange={(event) => { this.setState({ id: event.target.value }); }} type="text" placeholder="ID only on delete" /><br />*/}
                <input value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value }); }} type="text" placeholder="Dealership Name" /><br />
                <input value={this.state.manufacturerID} onChange={(event) => { this.setState({ manufacturerID: event.target.value }); }} type="text" placeholder="Manufacturer ID" /><br />
                <input value={this.state.address} onChange={(event) => { this.setState({ address: event.target.value }); }} type="text" placeholder="Address" /><br />
                <input value={this.state.phoneNumber} onChange={(event) => { this.setState({ phoneNumber: event.target.value }); }} type="text" placeholder="Phone Number" /><br />

                <button onClick={(() => {

                    // 3. When the button is clicked, set the state loading to true and begin the fetch method. Changing state triggers render to fire.
                    this.setState({ loading: true });
                    this.populateDealerships();
                }).bind(this)
                    // Start thread B.
                    // (Thread A continues)
                    //this.populateDealerships(); 
                    // Start thread C.
                    // (Thread A continues)
                

                }>Refresh</button>

                <button onClick={(() => { this.setState({ loading: true }); this.addName(); }).bind(this)}>Add </button>
                {/*<button onClick="document.getElementById('myInput').value = ''">Clear </button>*/}

            </div>

        );
        // Thread A ends.
    }

    async addName() {
        // Request params gets converted to the query string (the bit after the question mark).
        let requestParams = {
            id: this.state.id,
            name: this.state.name,
            manufacturerID: this.state.manufacturerID,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }
        // Request options is used to specify what method the request will use.
        let requestOptions = {
            method: "POST"
        }
        const response = await fetch("dealership?" + new URLSearchParams(requestParams), requestOptions);

        console.log(response);

        // If we want to refresh the list automatically, all we have to do is call our update methods at the end.
        this.populateCount();
        this.populateDealerships();
    }

    // Remove and update accept a parameter, which is fed by the name of which list item was clicked.
    async removeDealership(stringToRemove) {
        let requestParams = {
            id: stringToRemove
            //name: this.state.name,
            //manufacturerID: this.state.manufacturerID,
            //address: this.state.address,
            //phoneNumber: this.state.phoneNumber

        }
        let requestOptions = {
            method: "DELETE"
        }
        const response = await fetch("dealership?" + new URLSearchParams(requestParams), requestOptions);

        console.log(response);

        this.populateCount();
        this.populateDealerships();
    }

    async updateDealership(stringToUpdate) {
        let requestParams = {
            id: stringToUpdate,
            name: this.state.name,
            manufacturerID: this.state.manufacturerID,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }
        let requestOptions = {
            method: "PUT"
        }
        const response = await fetch("dealership?" + new URLSearchParams(requestParams), requestOptions);

        console.log(response);

        this.populateCount();
        this.populateDealerships();
    }

    async populateCount() {
        const responseCount = await fetch('dealership/count');
        const dataCount = await responseCount.json();
        this.setState({ count: dataCount, loading: false });
        // Thread B ends.
    }

    // 5. Fetch the strings and update the state with the new data and turn off loading when the data gets back.
    async populateDealerships() {
        const responseList = await fetch('dealership/list');
        const dataList = await responseList.json();
        this.setState({ dealerships: dataList, loading: false });
        // Thread C ends.
    }
}
