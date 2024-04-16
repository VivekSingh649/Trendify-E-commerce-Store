import React from 'react'

function NewArrivals(props) {
    return (
        <section className='default-padding bg-gray'>
            <div className="container">
                <div className="product_wrapper_grid">
                    <div className="row">
                        <div className="section-heading">
                            <h4>{props.subTitle}</h4>
                            <h2>{props.mainTitle}</h2>
                        </div>
                    </div>
                    <div className="row gx-5">{props.products}</div>
                </div>
            </div>
        </section>
    )
}

export default NewArrivals
