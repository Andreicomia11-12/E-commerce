import React, { Fragment } from 'react'
import '../css/footer.css'

const footer = () => {
  return (
    <Fragment>
                <footer id='about' className="text-center text-lg-start text-dark">
                    {/* Grid container */}
                    <div className="container p-4 pb-0">
                    {/* Section: Links */}
                    <section>
                        {/* Grid row */}
                        <div className="row">
                        {/* Grid column */}
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Mente Exceptional Inc</h6>
                            <p>
                            Mente Excepcional is a private corporation that sells, markets and distributes FMCG products, namely Nutriasia, in various areas in Luzon
                            </p>
                        </div>
                        {/* Grid column */}

                        <hr className="w-100 clearfix d-md-none" />

                        {/* Grid column */}
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                            <p><a href="/" className="text-white">MDBootstrap</a></p>
                            <p><a href="/" className="text-white">MDWordPress</a></p>
                            <p><a href="/" className="text-white">BrandFlow</a></p>
                            <p><a href="/" className="text-white">Bootstrap Angular</a></p>
                        </div>
                        {/* Grid column */}

                        <hr className="w-100 clearfix d-md-none" />

                        {/* Grid column */}
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                            <p><a href="/" className="text-dark ">Facebook</a></p>
                            <p><a href="/" className="text-dark">Instagram</a></p>
                            <p><a href="/" className="text-dark">Shipping Rates</a></p>
                            <p><a href="/" className="text-dark">Help</a></p>
                        </div>

                        {/* Grid column */}
                        <hr className="w-100 clearfix d-md-none" />

                        {/* Grid column */}
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                            <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                            <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                            <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                        </div>
                        {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </section>
                    {/* Section: Links */}

                    <hr className="my-3" />

                    {/* Section: Copyright */}
                    <section className="p-3 pt-0">
                        <div className="row d-flex align-items-center">
                        {/* Grid column */}
                        <div className="col-md-7 col-lg-8 text-center text-md-start">
                            {/* Copyright */}
                            <div className="p-3">
                            © 2024: Cram Crew
                            <a href="https://mdbootstrap.com/" className="text-white">MDBootstrap.com</a>
                            </div>
                            {/* Copyright */}
                        </div>
                        {/* Grid column */}

                        {/* Grid column */}
                        <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                            {/* Social icons */}
                            <a className="btn btn-outline-light btn-floating m-1" href='/' role="button">
                            <i className="fab fa-facebook-f"></i>
                            </a>

                            <a className="btn btn-outline-light btn-floating m-1" href='/' role="button">
                            <i className="fab fa-twitter"></i>
                            </a>

                            <a className="btn btn-outline-light btn-floating m-1" href='/' role="button">
                            <i className="fab fa-google"></i>
                            </a>

                            <a className="btn btn-outline-light btn-floating m-1" href='/' role="button">
                            <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                        {/* Grid column */}
                        </div>
                    </section>
                    {/* Section: Copyright */}
                    </div>
                    {/* Grid container */}
                </footer>
                {/* Footer */}

    </Fragment>
  )
}

export default footer
