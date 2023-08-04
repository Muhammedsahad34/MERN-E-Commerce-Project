import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminViewProduct() {
    const navigate = useNavigate();
    return (
        <div className='container-fluid'>
            <div className='row'>
                <button className='btn btn-success w-25 mt-4 ms-auto' onClick={()=>{navigate('/add-product')}}>Add Products</button>
            </div>
                <table class="table table-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
    )
}

export default AdminViewProduct