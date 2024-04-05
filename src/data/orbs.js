import { isMobile } from "../utils/isMobile";

const desktopPositions = [
    { x: -20, y: -13, z: -2, URL: 'https://www.linkedin.com/in/harrison-cole-wilkinson-528310191/', image: 'images/linked.png', label: 'LinkedIn' },
    { x: 0, y: -21, z: -2, URL: "/files/Cole_Wilkinson_Resume.pdf", image: 'images/resume.png', label: 'Resume' },
    { x: 20, y: -13, z: -2, URL: "#contact", image: 'images/mail.png', label: 'Contact' },
    { x: 20, y: 10, z: -2, URL: "#projects", image: 'images/project.png', label: 'Projects' },
    { x: 0, y: 18, z: -2, URL: "#about", image: 'images/profile.png', label: 'About Me' },
    { x: -20, y: 10, z: -2, URL: "#work", image: 'images/code.png', label: 'Work' }
];


const mobilePositions = [
    { x: -12, y: -13, z: -2, URL: 'https://www.linkedin.com/in/harrison-cole-wilkinson-528310191/', image: 'images/linked.png', label: 'LinkedIn' },
    { x: 0, y: -15, z: -2, URL: "/files/Cole_Wilkinson_Resume.pdf", image: 'images/resume.png', label: 'Resume' },
    { x: 12, y: -13, z: -2, URL: "#contact", image: 'images/mail.png', label: 'Contact' },
    { x: 12, y: 12, z: -2, URL: "#projects", image: 'images/robot.png', label: 'Projects' },
    { x: 0, y: 14, z: -2, URL: "#about", image: 'images/profile.png', label: 'About' },
    { x: -12, y: 12, z: -2, URL: "#work", image: 'images/code.png', label: 'Work' }
]


export const textPositions = () => {
    if (isMobile()) {
        return mobilePositions;
    }
    return desktopPositions;
}