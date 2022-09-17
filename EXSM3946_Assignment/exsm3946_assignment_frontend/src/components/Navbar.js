import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React from 'react';

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Exsm3946 - Assignments
            </Link>
            <ul>
                <CustomLink to="/dealership">Dealership</CustomLink>
                <CustomLink to="/manufacturer">Manufacturer</CustomLink>
                <CustomLink to="/model">Model</CustomLink>
                <CustomLink to="/vehicle">Vehicle</CustomLink>

            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}