import { Link } from "react-router-dom";
import "../stylecss/home.css";


// const imageSources = [
//     { src: "images/robo.jpg", link: "/p1" },
//     { src: "images/robo.jpg", link: "/p2" },
//     { src: "images/robo.jpg", link: "/p3" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },
//     { src: "images/robo.jpg", link: "/p4" },

//     // Add more images as needed
// ];
const Home = () => {
    return (
        <div>
            <div className="homie">
                <p><span>hello Dude</span></p>
            </div>
            <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
                <div className="xyz">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="images/carousel1.jpg" class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="images/carousel2.jpg" class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="images/carousel3.jpg" class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button></div>
            </div>
            <br />


            {/* <div className="gallery">
                {imageSources.map((image, index) => (
                    <Link key={index} to={image.link}>
                        <img src={image.src} className="img-thumbnail custom-img" alt="Product" />
                    </Link>
                ))}
            </div> */}
            <h5 className="headings">Electronics</h5>
            <div className="image-grid">
                <div className="big-image">
                    <img src="images/electronics.jpg" alt="Big" />
                </div>
                <div className="small-images">
                    <Link to="/p1"><img src="images/ele1.jpg" alt="Small 1" /></Link>
                    <Link to="*"><img src="images/ele2.jpg" alt="Small 2" /></Link>
                    <Link><img src="images/ele3.jpg" alt="Small 3" /></Link>
                    <Link><img src="images/ele1.jpg" alt="Small 4" /></Link>
                </div>
            </div>
            <br></br>
            <h5>Fashion</h5>
            <div className="image-grid2">
                
                <div className="small-images2">
                    <Link><img src="images/fash1.webp" alt="Small 1" /></Link>
                    <Link><img src="images/fash1.png" alt="Small 2" /></Link>
                    <Link><img src="images/fash3.jpg" alt="Small 3" /></Link>
                    <Link><img src="images/fash4.jpg" alt="Small 4" /></Link>
                </div>
                <div className="big-image2">
                    <img  src="images/clothing.jpg" alt="Big" />
                </div>
            </div>
            <h5>stationary</h5>

            <div className="image-grid3">
                <div className="big-image3">
                    <img src="images/stati1.jpg" alt="big img 3"/>
                </div>
                <div className="small-images3">
                    <Link><img src="images/stati1.jpg" alt="stationary1" /></Link>
                    <Link><img src="images/stati2.webp" alt="stationary1" /></Link>
                    <Link><img src="images/stationary.jpg" alt="stationary1" /></Link>
                    <Link><img src="images/stationary.jpg" alt="stationary1" /></Link>
                </div>
            </div>
            <br></br>
            <div className="circles">
      <div className="image-container">
        <Link to="#"><img src="images/cir6.webp" alt="Grocery" /></Link>
        <div className="image-name">Grocery</div>
      </div>
      <div className="image-container">
        <Link to="#"><img src="images/cir1.webp" alt="Home" /></Link>
        <div className="image-name">Home</div>
      </div>
      <div className="image-container">
        <Link to="#"><img src="images/cir2.webp" alt="Patio & Garden" /></Link>
        <div className="image-name">Patio & Garden</div>
      </div>
      <div className="image-container">
        <Link to="#"><img src="images/cir3.webp" alt="Fashion" /></Link>
        <div className="image-name">Fashion</div>
      </div>
      <div className="image-container">
        <Link to="#"><img src="images/cir4.webp" alt="Electronics" /></Link>
        <div className="image-name">Electronics</div>
      </div>
      <div className="image-container">
        <Link to="#"><img src="images/cir5.webp" alt="Baby" /></Link>
        <div className="image-name">Baby</div>
      </div>
    </div>
        </div>
    );
}

export default Home;
