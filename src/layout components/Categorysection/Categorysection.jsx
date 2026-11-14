import dining from '../../../assets/images/dining.png'
import bedroom from '../../../assets/images/bedroom.png'
import livingroom from '../../../assets/images/livingroom.png'

import './categorySection.scss';

function CategorySection() {
    return(

        <>
        <section className="categorySection">
            <div className='categorySection-title'>
                <h1>Browse The Range</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="categorySection-cards">
                <div className="category-cards">
                        <img src={dining}/>
                        <p>Dining</p>
                </div>
                <div className="category-cards">
                        <img src={livingroom}/>
                        <p>LivingRoom</p>
                </div>
                <div className="category-cards">
                        <img src={bedroom}/>
                        <p>Bedroom</p>
                </div>
            </div>
        </section>
        </>
    )
}

export default CategorySection;