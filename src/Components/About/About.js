/*
This is the about my page of the website
*/


import './About.css'

import React, {useState, useEffect, useRef} from 'react';

export function About() {

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
    <div>

      <div className="aboutme-content">
        <p className="aboutme-title">About Me</p>

        <div className="aboutme-main-content">
          <img className = "aboutme-image" src={process.env.PUBLIC_URL + "profile_photo#1.jpg"}></img>
          <br></br>
          <p className="aboutme-bio">
            Davin Win Kyi (ကျော်စံမြင့် kyaw san myint)
            <br></br>
            <br></br>
            Hi Everyone! My name is Davin Win Kyi. I'm currently a 1st year master's student at the Univeristy of Washington! <br></br>
            My current research interest revolve around Computer Vision, AR/VR/XR, Robotics, HCI and accessibility <br></br>
            <br></br>
            During my free time, I like watching youtube channels like Kurzgesagt and cutscenes of games. <br></br>
            I also was a competitive swimmer, but unfortunately am not in my golden days. <br></br>
            <br></br>
            I love discussing research, so if you would like to reach out to me, feel free to fill out my <br></br>
            contact form or email me at davin123@cs.washington.edu.
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
                  <p> Bachelor of Computer Science 2019-2024</p>
                </div>
            </div>

            <div className="aboutme-element">
              <a href="https://www.cs.washington.edu/">
                <img className="aboutme-element-image" src={process.env.PUBLIC_URL + "/img/UW icon.png"}></img>
              </a>
              <div className="aboutme-element-text">
                  <p>University of Washington</p>
                  <p> Masters of Computer Science 2024-Present</p>
                </div>
            </div>


          </div>

          <div className="aboutme-Experience">
            <p className="aboutme-Experience-title">Experience</p>

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
            <DropDownItem img={process.env.PUBLIC_URL + "/img/resume.jpeg"} text={"CV"} website={"https://drive.google.com/file/d/1NJg7ttQj0vg1SojThLjdRM1a_zEd25Gl/view?usp=drive_link"}/>
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

/*
        <a href="https://drive.google.com/file/d/173AAasbF66ZX1EUa88uzUN6o-4kdKU4C/view?usp=sharing">
          <button className="aboutme-cirriculumVitae">
            Cirriculumn Vitae
          </button>
        </a>
        */


/*
<div className="aboutme-experienceAndEducation">
          <div className="aboutme-education">
            <p>
              Education
            </p>

            <div className="aboutme-education-element">
              <img className="aboutme-education-img" src="img/UW icon.png"></img>
              <div className="aboutme-education-text">
                <p>University of Washington</p>
                <p> Bachelor of Computer Science 2020-2024</p>
              </div>
            </div>


            <div className="aboutme-education-element">
              <img className="aboutme-education-img" src="img/UW icon.png"></img>
              <div className="aboutme-education-text">
                <p>University of Washington</p>
                <p> Masters of Computer Science 2024-present</p>
              </div>
            </div>


          </div>

          <div className="aboutme-experience">
            <p>
              Experience
            </p>

            <div className="aboutme-experience-element">
              <img className="aboutme-experience-img" src="img/makeability icon.png"></img>
              <div className="aboutme-experience-text">
                <p>University of Washington</p>
                <p> Masters of Computer Science 2024-present</p>
              </div>
            </div>

            <div className="aboutme-experience-element">
              <img className="aboutme-experience-img" src="img/makeability icon.png"></img>
              <div className="aboutme-experience-text">
                <p>University of Washington</p>
                <p> Masters of Computer Science 2024-present</p>
              </div>
            </div>

            <div className="aboutme-experience-element">
              <img className="aboutme-experience-img" src="img/ubicomp.png"></img>
              <div className="aboutme-experience-text">
                <p>Ubiqioutus Computing Lab</p>
                <p> Feb 2023-Sep 2023</p>
              </div>
            </div>
          </div>
        </div>
        */