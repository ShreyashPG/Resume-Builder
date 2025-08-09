import { Box, Button, CircularProgress, Paper } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
import Confetti from "react-confetti";
import github from "../../assets/github.png";
import leetcode from "../../assets/leetcode.png";
import codechef from "../../assets/codechef.png";
import codeforces from "../../assets/codeforces.png";
import DownloadIcon from "@mui/icons-material/Download";
import "../../styles/resumetemplate1.css";
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function ResumeTemplate3() {
  const profile = useSelector((state) => state.profileDetails);
  const education = useSelector((state) => state.educationDetails);
  const projects = useSelector((state) => state.projectDetails);
  const experience = useSelector((state) => state.experienceDetails);
  const extraDetails = useSelector((state) => state.extraDetails);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    try {
      const resumeContainer = document.querySelector(".resume-container");

      if (resumeContainer) {
        setLoading(true);
        const opt = {
          margin: 0.1,
          filename: 'user-resume.pdf',
          image: { type: 'jpeg', quality: 1.00 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        html2pdf().set(opt).from(resumeContainer).save().then(() => {
          setLoading(false);
          setCongratsVisible(true);
          setTimeout(() => {
            setCongratsVisible(false);
          }, 5000);
        });
      } else {
        console.error("Resume container not found.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      setLoading(false);
    }
  };

  const customStyle = {
    width: "100%",
    maxWidth: "794px",
    height: "1123px",
    maxHeight: "1123px",
    padding: "0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden"
  };

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={congratsVisible ? 600 : 0}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "2vw",
          flexGrow: 1,
        }}
      >
        <Paper className="resume-container" elevation={2} style={customStyle}>
          {/* Left Sidebar */}
          <div className="sidebar">
            <div className="profile-section">
              <div className="profile-circle">
                <span>{profile.firstName?.[0]?.toUpperCase()}{profile.lastName?.[0]?.toUpperCase()}</span>
              </div>
              <h2 className="profile-name">{profile.firstName} {profile.lastName}</h2>
            </div>

            {/* Contact */}
            <div className="contact-section">
              <h3 className="sidebar-heading">Contact</h3>
              <div className="contact-item">
                <i className="fa-solid fa-phone"></i>
                <span>{profile.mobile}</span>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-envelope"></i>
                <span>{profile.email}</span>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-map-marker"></i>
                <span>{profile.address}</span>
              </div>
            </div>

            {/* Skills */}
            {extraDetails?.skills?.languages?.length > 0 && (
              <div className="skills-section">
                <h3 className="sidebar-heading">Skills</h3>
                {extraDetails?.skills?.languages?.length > 0 && (
                  <div className="skill-category">
                    <h4>Languages</h4>
                    <div className="skill-tags">
                      {extraDetails.skills.languages.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {extraDetails?.skills?.web?.length > 0 && (
                  <div className="skill-category">
                    <h4>Web</h4>
                    <div className="skill-tags">
                      {extraDetails.skills.web.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {extraDetails?.skills?.webFrameworks?.length > 0 && (
                  <div className="skill-category">
                    <h4>Frameworks</h4>
                    <div className="skill-tags">
                      {extraDetails.skills.webFrameworks.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {extraDetails?.skills?.databases?.length > 0 && (
                  <div className="skill-category">
                    <h4>Databases</h4>
                    <div className="skill-tags">
                      {extraDetails.skills.databases.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Social Links */}
            <div className="social-section">
              <h3 className="sidebar-heading">Coding Profiles</h3>
              <div className="social-links">
                {profile.github && (
                  <Link to={profile.github} target="_blank" className="social-link">
                    <img src={github} alt="github" />
                    <span>GitHub</span>
                  </Link>
                )}
                {profile.leetcode && (
                  <Link to={profile.leetcode} target="_blank" className="social-link">
                    <img src={leetcode} alt="leetcode" />
                    <span>LeetCode</span>
                  </Link>
                )}
                {profile.codechef && (
                  <Link to={profile.codechef} target="_blank" className="social-link">
                    <img src={codechef} alt="codechef" />
                    <span>CodeChef</span>
                  </Link>
                )}
                {profile.codeforces && (
                  <Link to={profile.codeforces} target="_blank" className="social-link">
                    <img src={codeforces} alt="codeforces" />
                    <span>Codeforces</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Experience */}
            {experience?.length > 0 && (
              <section className="content-section">
                <h2 className="section-title">Experience</h2>
                <div className="timeline">
                  {experience.map((exp, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="exp-header">
                          <h3>{exp.role}</h3>
                          <span className="date-badge">
                            {moment(exp.start_date).format("MMM YYYY")} - {moment(exp.end_date).format("MMM YYYY")}
                          </span>
                        </div>
                        <h4>{exp.institute}</h4>
                        <ul>
                          {exp?.desc?.split('\n')?.map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <section className="content-section">
                <h2 className="section-title">Projects</h2>
                <div className="projects-grid">
                  {projects.map((project, index) => (
                    <div key={index} className="project-card">
                      <div className="project-header">
                        <h3>{project.title}</h3>
                        <Link to={project.link} target="_blank">
                          <i className="fa-solid fa-external-link"></i>
                        </Link>
                      </div>
                      <div className="tech-stack">{project.techStack}</div>
                      <ul>
                        {project?.description?.split('\n')?.map((line, index) => (
                          <li key={index}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            <section className="content-section">
              <h2 className="section-title">Education</h2>
              <div className="education-list">
                <div className="education-item">
                  <div className="edu-header">
                    <h3>{education.college}</h3>
                    <span className="date-badge">{education.startYear}-{education.endYear}</span>
                  </div>
                  <p>{education.year} {education.branch} Engineering</p>
                  {education?.grades && <p>CGPA: {education.grades}</p>}
                  <p className="location">{education.city}</p>
                </div>
                
                {education.higherCollege && (
                  <div className="education-item">
                    <div className="edu-header">
                      <h3>{education.higherCollege}</h3>
                      <span className="date-badge">{education.startYear2}-{education.endYear2}</span>
                    </div>
                    {education?.percentage && <p>Percentage: {education.percentage}%</p>}
                    <p className="location">{education.city2}</p>
                  </div>
                )}

                {education.school && (
                  <div className="education-item">
                    <div className="edu-header">
                      <h3>{education.school}</h3>
                      <span className="date-badge">{education.startYear3}-{education.endYear3}</span>
                    </div>
                    {education?.percentage2 && <p>Percentage: {education.percentage2}%</p>}
                    <p className="location">{education.city3}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Achievements & Extra Curricular */}
            {(extraDetails?.achievements?.length > 0 || extraDetails?.extraCoCurricular?.length > 0) && (
              <section className="content-section">
                <h2 className="section-title">Achievements & Extra Curricular</h2>
                <ul className="achievements-list">
                  {extraDetails?.achievements?.map((achieve, index) => (
                    <li key={index}>{achieve}</li>
                  ))}
                  {extraDetails?.extraCoCurricular?.map((extra, index) => (
                    <li key={index}>{extra}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </Paper>

        <Button
          variant="contained"
          sx={{
            margin: "20px",
            borderRadius: "20px",
            width: "12rem",
            backgroundColor: "var(--btn)",
            color: 'black',
            '&:hover': { backgroundColor: "var(--btnHover)" }
          }}
          onClick={handleDownload}
          endIcon={<DownloadIcon />}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Download"
          )}
        </Button>
      </Box>
    </>
  );
}