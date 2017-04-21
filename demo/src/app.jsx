import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataEngine from 'data-engine';
import FilterValue from 'filter-value';

export default class app extends Component {
    static propTypes = {
        data: PropTypes.array
    }
    constructor(props) {
        super(props);

        this.dataEngine = new DataEngine(props.data);
        this.txtFilter = new FilterValue('applianceId');
        this.rgxFilter = new FilterValue('applianceLabel');
        this.arrFilter = new FilterValue('type');
        this.state = {
            data: this.dataEngine.getData()
        };
    }

    textFilter = (event) => {
        if (event.target.value.length !== 0) {
            this.txtFilter.updateValue(event.target.value);
            this.applyFilters(this.txtFilter);
            return true;
        }
        this.removeFilter('applianceId');
        return true;
    }
    regexFilter = (event) => {
        if (event.target.value.length !== 0) {
            const regex = new RegExp(`(${FilterValue.regexEscape(event.target.value)})`, 'i');
            this.rgxFilter.updateValue(regex);
            this.applyFilters(this.rgxFilter);
            return true;
        }
        this.removeFilter('applianceLabel');
        return true;
    }
    arrayFilter = (event) => {
        if (event.target.value.length !== 0) {
            this.arrFilter.updateValue(event.target.value.split(','));
            this.applyFilters(this.arrFilter);
            return true;
        }
        this.removeFilter(this.arrFilter);
        return true;
    }
    removeFilter = (filter) => {
        const data = this.dataEngine.removeFilter(filter);
        this.setState({ data });
    }
    applyFilters = (newFilter) => {
        const data = this.dataEngine.updateFilter(newFilter);
        this.setState({
            data
        });
    }
    render() {
        const body = this.state.data
                            .map(line => (
                                <tr key={line.id}>
                                    <td>{line.applianceId}</td>
                                    <td>{line.applianceLabel}</td>
                                    <td>{line.type}</td>
                                </tr>));
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th><input type="text" placeholder="Exact value" onChange={this.textFilter} /></th>
                        <th><input type="text" placeholder="Chunk value" onChange={this.regexFilter} /></th>
                        <th><input type="text" placeholder="Multiple value, by comma" onChange={this.arrayFilter} /></th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>);
    }
}

