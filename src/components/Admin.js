import { useNavigate } from 'react-router-dom';
import '../App.css';
import apiService from '../services/apiServices';
import React, { useState, useEffect } from 'react';

const Admin = () => {

    const [data, setData] = useState([]);
    const is_user = localStorage.getItem('role');
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('admin/users');
                setData(response.data);

            } catch (error) {
                console.error("error Fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const getdata = async () => {
        try {
            const response = await apiService.get('admin/users');
            setData(response.data);

        } catch (error) {
            console.error("error Fetching data: ", error);
        }
    }

    const updateUserToModerator = async (id) => {
        try {
            const response = await apiService.put(`admin/updateRoleToMOD/${id}`);
            console.log(response.data);
            getdata();

        } catch (error) {
            console.error("Error while Updating Role: ", error);
        }
    }

    const updateUserToUser = async (id) => {
        try {
            const response = await apiService.put(`admin/updateRoleToUser/${id}`);
            console.log(response.data);
            getdata();
        } catch (error) {
            console.error("Error while Updating Role: ", error);
        }
    }

    return (
        <div className="page-container-wide">
            {is_user === "ADMIN" ? (
                <>
                    <h4 className="section-title">
                        <i className="bi bi-shield-lock" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>
                        Admin Panel
                    </h4>
                    <div className="card-base">
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && Array.isArray(data) && data.length > 0 ?
                                        data.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <span className={`role-badge role-badge-${item.role ? item.role.toLowerCase() : 'user'}`}>
                                                        {item.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    {item.role === "USER" && (
                                                        <button className="btn-success-sm" onClick={() => updateUserToModerator(item.id)}>
                                                            <i className="bi bi-arrow-up-circle"></i> Promote to Mod
                                                        </button>
                                                    )}
                                                    {item.role === "MODERATOR" && (
                                                        <button className="btn-warning-sm" onClick={() => updateUserToUser(item.id)}>
                                                            <i className="bi bi-arrow-down-circle"></i> Demote to User
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                        : (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--gray-400)' }}>
                                                    No users found
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <>{navigate("/api/auth/signin")}</>
            )}
        </div>
    );
};
export default Admin
