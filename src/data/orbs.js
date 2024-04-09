import { isMobile } from "../utils/isMobile";

const desktopPositions = [
    { x: -20, y: -13, z: -2, URL: 'https://github.com/hcwilk', image: 'images/git.png', label: 'GitHub' },
    { x: 0, y: -21, z: -2, URL: "/files/Cole_Wilkinson_Resume.pdf", image: 'images/resume.png', label: 'Resume' },
    { x: 20, y: -13, z: -2, URL: "#contact", image: 'images/mail.png', label: 'Contact' },
    { x: 20, y: 10, z: -2, URL: "#projects", image: 'images/project.png', label: 'Projects' },
    { x: 0, y: 18, z: -2, URL: "#about", image: 'images/profile.png', label: 'About Me' },
    { x: -20, y: 10, z: -2, URL: "#work", image: 'images/code.png', label: 'Work' }
];



export const textPositions = () => {
    return desktopPositions;
}