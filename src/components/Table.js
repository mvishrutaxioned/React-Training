import React from 'react';
import Employee from './Employee';

const Table = ({data, onDelete, onEdit}) => {
  return (
    <ul>
        {data.map(elem => (
            <Employee key={elem.id} data={elem} onDelete={onDelete} onEdit={onEdit} />
        ))}
    </ul>
    // <table>
    //     <thead>
    //         <tr>
    //             <th>Profile Img</th>
    //             <th>Name</th>
    //             <th>Email</th>
    //             <th>Phone</th>
    //             <th>Edit</th>
    //             <th>Delete</th>
    //         </tr>
    //     </thead>
    //     <tbody>
            
    //     </tbody>
    // </table>
    );
};

export default Table;
