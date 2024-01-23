import React from 'react';
import './AdminAllOrders.css';

function AdminAllOrders() {
  return (
    <div className='view-all-orders'>
      <div className="table-container">
        <table>
          <thead>
            <tr className='t-row-1'>
              <th>Order Id</th>
              <th>Date</th>
              <th>UserName</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className='t-row-1 row-2' style={{cursor:"pointer"}}>
              <td>ORders Page</td>
              <td>ORders Page</td>
              <td>ORders Page</td>
              <td>ORders Page</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminAllOrders