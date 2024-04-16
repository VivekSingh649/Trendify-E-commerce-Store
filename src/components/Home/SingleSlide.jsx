import React from 'react'
import { Link } from 'react-router-dom'

function SingleSlide(props) {
    return (
        <div className="single_slide">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center order">
                        <div className="hero_content">
                            <h4>{props.subTitle}</h4>
                            <h1>{props.mainTitle}</h1>
                            <div className="d-flex gap-4">
                                <Link className='btn-first'>{props.btnFirst}</Link>
                                <Link className='btn-first secondary'>{props.btnSecond}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 p-5">
                        <div className="model_image">
                            <img src={props.modelImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleSlide
