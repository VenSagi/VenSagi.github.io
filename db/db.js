export default {
	bio: {
		about: {
			text: [

				"Howdy!",
				"I'm Venkat Sagi, a Freshman Engineering student at Texas A&M University currently pursuing a degree in Computer Science. Aspiring programmer passionate About backend web development. Through my coding experience and programming skills, I aim to learn and do great things in the computer science field.",
				"I'm a developer, seeking an internship opportunity to gain practical experience and further develop my skills in the field of backend development.",
				"I love to do art, play video-games, and travel.",
			],
		},
		contact: {
			text: [
				"If you would like to get in touch with me or know more about me, feel free to click the links below",
			],
		},
	},
	skills: [
		{
			title: "Languages",
			skillName: "Python",
			color: "1",
			percentage: "75",
		},
		{
			title: "Frameworks/Libraries",
			skillName: "Java",
			color: "6",
			percentage: "75",
		},
		{
			title: "Backend",
			skillName: "C#",
			color: "2",
			percentage: "50",
		},
		{
			title: "Clouds",
			skillName: "Swift",
			color: "3",
			percentage: "50",
		},
		{
			title: "Design",
			skillName: "Django",
			color: "4",
			percentage: "30",
		},
		{
			title: "Version Control",
			skillName: "GitHub, Trello",
			color: "7",
			percentage: "70",
		},
		{
			title: "Editor",
			skillName: "VS Code, PyCharm, JupiterNotebook",
			color: "6",
			percentage: "80",
		},
	],
	projects: {
		web: [
			
			{
				projectName: "Programming Diaries",
				image: "images/programmingdiaries.png",
				summary:
					"Developed a full stack blog application to provide content on techical topics across the internet with admin interface.",
				preview: "https://programmingdiaries.herokuapp.com/",
				techStack: [
					"Django",
					"SQLite",
					"Bootstrap",
					"JavaScript",
					"Heroku",
				],
			},
			{
				projectName: "Find Your Bank",
				image: "images/findyourbank.png",
				summary:
					"Developed a React application to render a list of banks fetched from API. Filtered the banks based on queries from localstorage, marked favorites banks.",
				preview: "https://clever-fermi-0d5d76.netlify.app",
				techStack: ["Reactjs", "Bootstrap", "JavaScript", "Netlify"],
			},
			{
				projectName: "Web Portfolio",
				image: "images/portfolio.png",
				summary:
					"Web Portfolio to showcase acadmics, skills, projects and contact details in better manner.",
				preview: "https://github.com/vinaysomawat/Travographer-Portal",
				techStack: ["HTML", "Bootstrap", "JavaScript"],
			},
			{
				projectName: "Resume Builder",
				image: "images/resume-builder.png",
				summary:
					"Browser based editor to build and download Resumes in a customizable templates.",
				preview: "https://vinaysomawat.github.io/Resume-Builder",
				techStack: ["HTML", "Bootstrap", "JavaScript"],
			},
			
		],
		software: [
			
			{
				projectName: "Pizza Ordering ChatBot",
				image: "images/pizzaorderchatbot.png",
				summary:
					"ChatBot using Dialogflow, Firebase database which stores the chat data in the realtime database.",
				preview:
					"https://github.com/vinaysomawat/Pizza-Ordering-ChatBot",
				techStack: ["Dailogflow", "Firebase"],
			},
			{
				projectName: "WhatsApp-Bot",
				image: "images/whatsappbot.jpg",
				summary:
					"Python script which helps to send messages to WhatsApp contacts automatically using selenium and web automation.",
				preview: "https://github.com/vinaysomawat/WhatsApp-Bot",
				techStack: ["Selenium", "Chrome Webdriver", "Python"],
			},
			{
				projectName: "Bill Generator",
				image: "images/billgenerator.png",
				summary:
					"GUI to transfer data to excel sheets and generate bills on the local shops.",
				preview: "https://github.com/vinaysomawat/Bill-Generator",
				techStack: ["Tkinter", "Openxlpy", "Python"],
			},
			
		],
		android: [
			
			{
				projectName: "NITW-CSE",
				image: "images/nitwcse.jpg",
				summary:
					"The Application display details of Department courses, reference books, research, publication and faculty profile.",
				preview: "https://github.com/vinaysomawat/NITW-CSE",
				techStack: ["JAVA", "XML", "Android"],
			},
			{
				projectName: "CareerHigh-App",
				image: "images/carrerhigh.png",
				summary:
					"The Application display the webpages of website careerhigh.in in android devices.",
				preview: "https://github.com/vinaysomawat/CareerHigh-Android",
				techStack: ["JAVA", "XML", "Android"],
			},
			
		],
		freelance: [
			/*
			{
				projectName: "SnylloAir.com",
				image: "images/snylloair.png",
				summary:
					"Developed a company website to showcase the purpose, services and products provided by the company to audience.",
				preview: "https://www.snylloair.com/",
				techStack: ["Bootstrap", "JavaScript", "AWS-S3"],
			},
			{
				projectName: "Delivery+",
				image: "images/AM-Logo-.png",
				summary:
					"Android Application to display website in android devices.",
				preview:
					"https://play.google.com/store/apps/details?id=com.americanmarket.americanmarketandroid",
				techStack: ["Android", "JAVA", "Play Store"],
			},
			*/
		],
		
	},
	experience: [
		{
			title: "Little Elm Library Volunteering Program",
			duration: "June 2019 - 2022",
			subtitle: "Volunteering",
			details: [
				"Taught children at the library by creating informational videos about various animals to help them learn about animals.",
				"Volunteered at the Little Elm public library through services such as shelf reading, shelf straightening, and much more."
			],
			tags: [
				"Volunteering",
			],
			icon: "group",
		},
	],
	education: [
		{
			title: "Bachelors in Computer Science and Engineering",
			duration: "August 2022 - May 2026",
			subtitle: "Texas A&M University - College Station, Texas",
			details: [
				"Pursuing Bachelor's Degree in Computer Science",
				"Current Coursework: Engineering 102, Mathematics 151, Chemistry 107, Chemistry 117",
			],
			tags: ["Engineering", "Mathematics", "Chemistry"
			],
			icon: "graduation-cap",
		},
		{
			title: "Highschool Diploma                            ",
			duration: "August 2018 - May 2022",
			subtitle: "Lone Star High School - Frisco, Texas",
			details: [
				"Pursuing a Highschool Diploma with an interest in Computer Science",
				"Completed Coursework: AP Computer Science, Advanced Computer Science, AP Calculus BC",
			],
			tags: ["Computer Science", "Mathematics"],
			icon: "book",
		},
	],
	footer: [
		{
			label: "Contact",
			data: [
				{
					text: "Email",
					link: "mailto:varmasvse@gmail.com",
				},
				{
					text: "Resume",
					link: "https://drive.google.com/file/d/1QZM8rnMvAIhnAVfFSxR4xh6RQxn2IxEh/view?usp=sharing",
				},
			],
		},
		
		{
			label: "Dev Profiles",
			data: [
				{
					text: "GitHub",
					link: "https://github.com/VenSagi",
				},
				{
					text: "LeetCode",
					link: "https://leetcode.com/H1ghPuR/",
				},
			],
		},
		
		{
			label: "Social Profiles",
			data: [
				{
					text: "LinkedIn",
					link: "https://www.linkedin.com/in/venkat-sagi/",
				},
				{
					text: "Instagram",
					link: "https://www.instagram.com/mr.venkatam/",
				},
			],
		},
		{
			label: "copyright-text",
			data: [
				"Made by Venkat Sagi.",
				"Inspired by &hearts; Vinay Somawat."
			],
		},
	],
};
