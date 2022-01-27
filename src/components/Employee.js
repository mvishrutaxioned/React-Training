import React from 'react';

const Employee = ({data, onDelete, onEdit}) => {
  return (
    <li>
      <figure>
        <img src={data.profile} alt="Profile" />
      </figure>
      <h2>{data.name}</h2>
      <a href="mailto: xyz@gmail.com" title="Mail">{data.email}</a>
      <a href="tel: 1234567890" title="Phone">{data.phone}</a>
      <div className="events">
        <a href="#FIXME" className="edit" title="Edit" onClick={(e) => onEdit(e, data.id)}>Edit</a>
        <a href="#FIXME" className="delete" title="Delete" onClick={(e) => onDelete(e, data.id)}>Delete</a>
      </div>
    </li>
    // <tr>
    //     <td><img src={data.profile} alt="Profile" /></td>
    //     <td>{data.name}</td>
    //     <td>{data.email}</td>
    //     <td>{data.phone}</td>
    //     <td><a href="#FIXME" className="edit" onClick={(e) => onEdit(e, data.id)}>Edit</a></td>
    //     <td><a href="FIXME" className="delete" onClick={(e) => onDelete(e, data.id)}>Delete</a></td>
    // </tr>
  );
};

export default Employee;
