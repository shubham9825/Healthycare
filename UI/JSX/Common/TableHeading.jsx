import React from "react";
import '../../Assets/style.css';

// iterating table heading 
class TableHeading extends React.Component {
    render() {
        const rowHeading = [
            'First Name',
            'Last Name',
            'Date Of Birth',
            'Date Of Joining',
            'Title',
            'Department',
            'Employee Type',
            'Current Status',
        ];

        const action = ['Edit', 'Delete']
        const result = this.props.action ? rowHeading.concat(action) : rowHeading;

        return (
            <>
                <tr>
                    {result.map((data, index) => (
                        <th key={index} className="thStyle">
                            {data}
                        </th>
                    ))}
                </tr>
            </>
        );
    }
}

export default TableHeading;
