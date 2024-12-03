import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (
    <Fragment>
  <div className="sidebar-wrapper">
    <nav id="sidebar">
      <ul className="list-unstyled components">
        {/* Dashboard Link */}
        <li>
          <Link to="/dashboard">
            <i className="fa fa-tachometer"></i> Dashboard
          </Link>
        </li>

        {/* Products Dropdown */}
        <li>
          <Link
            to="#"
            className="dropdown-toggle"
            role="button"
            id="productDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-product-hunt"></i> Products
          </Link>

          <ul className="dropdown-menu" aria-labelledby="productDropdown">
            <li>
              <Link className="dropdown-item" to="/admin/products">
                <i className="fa fa-clipboard"></i> All
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin/product/new">
                <i className="fa fa-plus"></i> Create
              </Link>
            </li>
          </ul>
        </li>

        {/* Orders Link */}
        <li>
          <Link to="/admin/orders">
            <i className="fa fa-shopping-basket"></i> Orders
          </Link>
        </li>

      </ul>
    </nav>
  </div>
</Fragment>


  )
}

export default Sidebar
