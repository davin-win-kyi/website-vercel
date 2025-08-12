/*
This is the about my page of the website
*/


import './About.css'

import React, {useState, useEffect, useRef} from 'react';

export function About() {

  const [open, setOpen] = useState(false);

  const [dropdown, setDropdown] = useState(process.env.PUBLIC_URL + '/img/drop_down_icon.png')

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        setDropdown(process.env.PUBLIC_URL + '/img/drop_down_icon.png');
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
      return prevState === process.env.PUBLIC_URL + '/img/drop_down_icon.png' ? process.env.PUBLIC_URL + '/img/close icon.webp' : process.env.PUBLIC_URL + '/img/drop_down_icon.png';
    })
  }

  const handleClick = () => {
    toggleDropDown();
    setOpen(!open);
  }


  return (
    <div>

      <div className="aboutme-content">
        <p className="aboutme-title">About Me</p>

        <div className="aboutme-main-content">
          <img className = "aboutme-image" src={process.env.PUBLIC_URL + "img/profile_image_2.jpg"}></img>
          <br></br>
          <p className="aboutme-bio">
            Hi Everyone! My name is Davin Win Kyi. I'm currently a 1st year computer science <br></br> 
            master's student at the Univeristy of Washington! <br></br>
            My current research interest revolve around Robotics 🤖, Augmented Reality 🥽, <br></br> 
            Artifical intellegence, Computer Vision 👁️ and Human Computer Interaction (HCI) <br></br>
            <br></br>
            During my free time, I like hanging with friends, <br></br>
            going hiking, swimming, going for runs and lifting. 
            <br></br>
            <br></br>
            I also love discussing research, and if you would like to <br></br>
            reach out to me, feel free to reach out to me at <br></br> 
            davin123@cs.washington.edu.
          </p>
        </div>

        <div className="aboutme-EducationAndExperience">
          <div className="aboutme-Education">
            <p className="aboutme-Education-title">Education</p>
            <div className="aboutme-element">
              <a href="https://www.cs.washington.edu/">
                <img className="aboutme-element-image" src={process.env.PUBLIC_URL + "/img/UW icon.png"}></img>
              </a>
              <div className="aboutme-element-text">
                  <p>University of Washington</p>
                  <p> Bachelor of Computer Science Sep 2021-Mar 2024</p>
                </div>
            </div>

            <div className="aboutme-element">
              <a href="https://www.cs.washington.edu/">
                <img className="aboutme-element-image" src={process.env.PUBLIC_URL + "/img/UW icon.png"}></img>
              </a>
              <div className="aboutme-element-text">
                  <p>University of Washington</p>
                  <p> Masters of Computer Science Mar 2024-Present</p>
                </div>
            </div>


          </div>

          <div className="aboutme-Experience">
            <p className="aboutme-Experience-title">Experience</p>
            <div className="aboutme-element">
              <a href="https://hcrlab.cs.washington.edu/">
                <img className="aboutme-element-image" src={process.env.PUBLIC_URL + "/img/hcr_logo.svg"}></img>
              </a>
              <div className="aboutme-element-text">
                <p>Human Centered Robotics Lab</p>
                <p> Undergraduate Research Assistant Mar 2025 - Present</p>
              </div>
            </div>
            <div className="aboutme-element">
              <a href="https://robotlearning.cs.washington.edu/">
                <img className="aboutme-element-image" src={process.env.PUBLIC_URL + "/img/robot-learning-lab.png"}></img>
              </a>
              <div className="aboutme-element-text">
                <p>Robot Learning Lab</p>
                <p> Undergraduate Research Assistant Oct 2024 - Jun 2025</p>
              </div>
            </div>
            <div className="aboutme-element">
              <a href="https://makeabilitylab.cs.washington.edu/">
                <img className="aboutme-element-image" src={process.env.PUBLIC_URL + "/img/makeability icon.png"}></img>
              </a>
              <div className="aboutme-element-text">
                <p>Makeability Lab</p>
                <p> Research Assistant Nov 2022 - Present</p>
              </div>

            </div>

            <div className="aboutme-element">
              <a href="https://makeabilitylab.cs.washington.edu/">
                <img className="aboutme-element-image" src={process.env.PUBLIC_URL + "/img/makeability icon.png"}></img>
              </a>
              <div className="aboutme-element-text">
                <p>Makeability Lab</p>
                <p> Research Intern (REU) Sep 2023 - Dec 2023</p>
              </div>
            </div>

            <div className="aboutme-element">
              <a href="https://ubicomplab.cs.washington.edu/">
                <img className="aboutme-element-image" src={process.env.PUBLIC_URL + "/img/ubicomp.png"}></img>
              </a>
              <div className="aboutme-element-text">
                <p>Ubicomp Lab</p>
                <p> Undergraduate Research Assistant Feb 2023 - Sep 2023</p>
              </div>
            </div>
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
            <DropDownItem img={process.env.PUBLIC_URL + "/img/resume.jpeg"} text={"CV"} website={"https://drive.google.com/file/d/1-O0XNQIJ-CpJhUJkhkf7bJKz9kZp7lhP/view?usp=sharing"}/>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/contact.jpeg"} text={"Contact"} website={"/Contact"}/>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/projects.png"} text={"Projects"} website={"/Projects"}/>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/about me.png"} text={"About me"} website={"/About"}/>
            <DropDownItem img={process.env.PUBLIC_URL + "/img/teaching icon.jpeg"} text={"Teaching"} website={"/Teaching"}/>
          </ul>
        </div>

        <div className="aboutme-educationExperience">
          <div>
          </div>

          <div>
          </div>
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
