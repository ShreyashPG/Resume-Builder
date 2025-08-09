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
import "../../styles/resumetemplate2.css";
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function ResumeTemplate4() {
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
    flexDirection: "column",
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
          {/* Header Section */}
          <div className="header-section">
            <div className="header-content">
              <div className="name-title">
                <h1 className="main-name">{profile.firstName} {profile.lastName}</h1>
                <div className="contact-row">
                  <span><i className="fa-solid fa-phone"></i> {profile.mobile}</span>
                  <span><i className="fa-solid fa-envelope"></i> {profile.email}</span>
                  <span><i className="fa-solid fa-map-marker"></i> {profile.address}</span>
                </div>
                <div className="social-row">
                  {profile.github && (
                    <Link to={profile.github} target="_blank" className="social-icon">
                      <img src={github} alt="github" />
                    </Link>
                  )}
                  {profile.leetcode && (
                    <Link to={profile.leetcode} target="_blank" className="social-icon">
                      <img src={leetcode} alt="leetcode" />
                    </Link>
                  )}
                  {profile.codechef && (
                    <Link to={profile.codechef} target="_blank" className="social-icon">
                      <img src={codechef} alt="codechef" />
                    </Link>
                  )}
                  {profile.codeforces && (
                    <Link to={profile.codeforces} target="_blank" className="social-icon">
                      <img src={codeforces} alt="codeforces" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="content-wrapper">
            {/* Two Column Layout */}
            <div className="two-column-layout">
              {/* Left Column */}
              <div className="left-column">
                {/* Education */}
                <div className="section-block">
                  <h2 className="section-header">Education</h2>
                  <div className="section-content">
                    <div className="education-entry">
                      <h3 className="institution-name">{education.college}</h3>
                      <div className="degree-info">{education.year} {education.branch} Engineering</div>
                      <div className="education-meta">
                        <span className="duration">{education.startYear} - {education.endYear}</span>
                        {education?.grades && <span className="grade">CGPA: {education.grades}</span>}
                      </div>
                      <div className="location-info">{education.city}</div>
                    </div>

                    {education.higherCollege && (
                      <div className="education-entry">
                        <h3 className="institution-name">{education.higherCollege}</h3>
                        <div className="education-meta">
                          <span className="duration">{education.startYear2} - {education.endYear2}</span>
                          {education?.percentage && <span className="grade">Percentage: {education.percentage}%</span>}
                        </div>
                        <div className="location-info">{education.city2}</div>
                      </div>
                    )}

                    {education.school && (
                      <div className="education-entry">
                        <h3 className="institution-name">{education.school}</h3>
                        <div className="education-meta">
                          <span className="duration">{education.startYear3} - {education.endYear3}</span>
                          {education?.percentage2 && <span className="grade">Percentage: {education.percentage2}%</span>}
                        </div>
                        <div className="location-info">{education.city3}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {extraDetails?.skills?.languages?.length > 0 && (
                  <div className="section-block">
                    <h2 className="section-header">Technical Skills</h2>
                    <div className="section-content">
                      {extraDetails?.skills?.languages?.length > 0 && (
                        <div className="skill-group">
                          <h4 className="skill-title">Programming Languages:</h4>
                          <p className="skill-list">{extraDetails.skills.languages.join(', ')}</p>
                        </div>
                      )}
                      {extraDetails?.skills?.web?.length > 0 && (
                        <div className="skill-group">
                          <h4 className="skill-title">Web Technologies:</h4>
                          <p className="skill-list">{extraDetails.skills.web.join(', ')}</p>
                        </div>
                      )}
                      {extraDetails?.skills?.webFrameworks?.length > 0 && (
                        <div className="skill-group">
                          <h4 className="skill-title">Frameworks:</h4>
                          <p className="skill-list">{extraDetails.skills.webFrameworks.join(', ')}</p>
                        </div>
                      )}
                      {extraDetails?.skills?.databases?.length > 0 && (
                        <div className="skill-group">
                          <h4 className="skill-title">Databases:</h4>
                          <p className="skill-list">{extraDetails.skills.databases.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Core Subjects */}
                <div className="section-block">
                  <h2 className="section-header">Core Subjects</h2>
                  <div className="section-content">
                    <ul className="subject-list">
                      <li>Data Structures & Algorithms</li>
                      <li>Database Management System</li>
                      <li>Operating System</li>
                      <li>Computer Networks</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="right-column">
                {/* Experience */}
                {experience?.length > 0 && (
                  <div className="section-block">
                    <h2 className="section-header">Professional Experience</h2>
                    <div className="section-content">
                      {experience.map((exp, index) => (
                        <div key={index} className="experience-entry">
                          <div className="exp-header-row">
                            <h3 className="role-title">{exp.role}</h3>
                            <span className="date-range">
                              {moment(exp.start_date).format("MMM YYYY")} - {moment(exp.end_date).format("MMM YYYY")}
                            </span>
                          </div>
                          <h4 className="company-name">{exp.institute}</h4>
                          <ul className="experience-points">
                            {exp?.desc?.split('\n')?.map((line, index) => (
                              <li key={index}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects?.length > 0 && (
                  <div className="section-block">
                    <h2 className="section-header">Projects</h2>
                    <div className="section-content">
                      {projects.map((project, index) => (
                        <div key={index} className="project-entry">
                          <div className="project-header-row">
                            <h3 className="project-title">{project.title}</h3>
                            <Link to={project.link} target="_blank" className="project-link">
                              <i className="fa-solid fa-external-link"></i>
                            </Link>
                          </div>
                          <div className="tech-stack-badge">{project.techStack}</div>
                          <ul className="project-points">
                            {project?.description?.split('\n')?.map((line, index) => (
                              <li key={index}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {extraDetails?.achievements?.length > 0 && (
                  <div className="section-block">
                    <h2 className="section-header">Achievements</h2>
                    <div className="section-content">
                      <ul className="achievement-list">
                        {extraDetails.achievements.map((achieve, index) => (
                          <li key={index}>{achieve}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Extra Curricular */}
                {extraDetails?.extraCoCurricular?.length > 0 && (
                  <div className="section-block">
                    <h2 className="section-header">Extra Curricular</h2>
                    <div className="section-content">
                      <ul className="extra-list">
                        {extraDetails.extraCoCurricular.map((extra, index) => (
                          <li key={index}>{extra}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
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