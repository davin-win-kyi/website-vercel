import './Teaching.css'

import React, {useState, useEffect, useRef} from 'react';

export function Teaching() {

  const [open, setOpen] = useState(false);

  const [dropdown, setDropdown] = useState(process.env.PUBLIC_URL + '/drop_down_icon.png')

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        setDropdown(process.env.PUBLIC_URL + '/drop_down_icon.png');
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);


    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });


  /*
  Function used to toggle the drop down
  */
  const toggleDropDown = () => {
    setDropdown(prevState => {
      return prevState === process.env.PUBLIC_URL + '/drop_down_icon.png' ? process.env.PUBLIC_URL + '/img/close icon.webp' : process.env.PUBLIC_URL + '/drop_down_icon.png';
    })
  }

  const handleClick = () => {
    toggleDropDown();
    setOpen(!open);
  }


  return (
    <div className="App">

      <div className="teaching-main">
        <p className="teaching-title">Courses Taught</p>
        <div className="teaching-classes">
          <div className="teaching-class">
            <a href="https://docs.google.com/document/d/e/2PACX-1vTjb0nvBM7lrm9RzEXRuQPHbOmAPvOpCvtmqYVutbf0Y-eDnHDWZJtz11T_XyatuKl_kQOFo_sFCbLe/pub">
              <img className="teaching-class-img" src={process.env.PUBLIC_URL + "/img/CSE340_spring2024.png"}></img>
            </a>
            <p className="teaching-class-text">
              <p>Course Taught: CSE 340 Spring 2024</p>
              <p className="teaching-class-text-duties">Duties: Course material creation and testing, leading sections of 70+ students, hosting office hours for 70+ students</p>
            </p>
          </div>
        </div>

        <div className="teaching-classes">
          <div className="teaching-class">
            <a href="https://courses.cs.washington.edu/courses/cse340/">
              <img className="teaching-class-img" src={process.env.PUBLIC_URL + "/img/CSE 340.png"}></img>
            </a>
            <p className="teaching-class-text">
              <p>Course Taught: CSE 340 Autumn 2023</p>
              <p className="teaching-class-text-duties">Duties: Administrative duties and overseeing of course organization</p>
            </p>
          </div>
        </div>

        <div className="teaching-classes">
          <div className="teaching-class">
            <a href="https://courses.cs.washington.edu/courses/cse340/23sp/">
              <img className="teaching-class-img" src={process.env.PUBLIC_URL + "/img/CSE 340.png"}></img>
            </a>
            <p className="teaching-class-text">
              <p>Course Taught: CSE 340 Spring 2023</p>
              <p className="teaching-class-text-duties">Duties: Course material creation and testing, grading assignments, leading sections of 20+ students, hosting office hours for 40+ students</p>
            </p>
          </div>
        </div>

        <div className="teaching-classes">
          <div className="teaching-class">
            <a href="https://courses.cs.washington.edu/courses/cse340/23wi/">
              <img className="teaching-class-img" src={process.env.PUBLIC_URL + "/img/CSE340_sp2023.jpeg"}></img>
            </a>
            <p className="teaching-class-text">
              <p>Course Taught: CSE 340 Winter 2023</p>
              <p className="teaching-class-text-duties">Duties: Course material creation and testing, grading assignments, leading sections of 20+ students, hosting office hours for 40+ students</p>
            </p>
          </div>
        </div>

        <div className="teaching-classes">
          <div className="teaching-class">
            <a href="https://sites.google.com/cs.washington.edu/cse414-22au/">
              <img className="teaching-class-img-last" src={process.env.PUBLIC_URL + "/img/CSE 414 icon.jpeg"}></img>
            </a>
            <p className="teaching-class-text">
              <p>Course Taught: CSE 414 Autumn 2022</p>
              <p className="teaching-class-text-duties">Duties: Leading sections of 30+ students, hosting office hours for 300+ students</p>
            </p>
          </div>
        </div>
      </div>



      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={handleClick}>
          <img src={dropdown}></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>Davin Win Kyi<br/><span>Undergraduate Research Assistant</span></h3>
          <ul>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/home.png"} text={"Home"} website={"/"} />
            <DropDownItem img={process.env.PUBLIC_URL + "/img/resume.jpeg"} text={"CV"} website={"https://drive.google.com/file/d/173AAasbF66ZX1EUa88uzUN6o-4kdKU4C/view?usp=sharing"}/>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/contact.jpeg"} text={"Contact"} website={"/Contact"}/>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/projects.png"} text={"Projects"} website={"/Projects"}/>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/about me.png"} text={"About me"} website={"/About"}/>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/teaching icon.jpeg"} text={"Teaching"} website={"/Teaching"}/>
          </ul>
        </div>
      </div>

      <div className="background"></div>

    </div>
  );
}

function DropDownItem(props) {
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a href={props.website}> {props.text} </a>
    </li>
  );
}