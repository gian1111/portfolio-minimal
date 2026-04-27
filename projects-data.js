// Dati dei progetti - CMS
const projectsData = [
    {
        id: 1,
        title: "SSC Napoli",
        description: "Social Media Design project for SSC Napoli including assets in different sizes and outputs. Concept design",
        fullDescription: "This project redefines the digital presence of Napoli SSC through a curated series of social media assets. By balancing the club's iconic blue identity with modern editorial layouts, the design focuses on clarity, impact, and a cohesive visual language across all digital touchpoints.",
        tags: ["Art Direction", "Social Media"],
        image: "https://via.placeholder.com/800x400?text=Progetto+1",
        galleryLayout: [3, 2, 2],
        gallery: [
            { src: "optimized/ssc-napoli/contenapoli.jpg", section: 0 },
            { src: "optimized/ssc-napoli/testnapoli_3.jpg", section: 0 },
            { src: "optimized/ssc-napoli/testnapoli_14png.jpg", section: 0 },
            { src: "optimized/ssc-napoli/testnapoli_4.jpg", section: 1 },
            { src: "optimized/ssc-napoli/contenapoli.jpg", section: 1 },
            { src: "optimized/ssc-napoli/testnapoli_132png.jpg", section: 2 },
            { src: "optimized/ssc-napoli/victor.jpg", section: 2 }
        ],
        // Optional: extra text blocks shown at the bottom (after Details/Tags)
        blocks: [
            {
                type: "text",
                title: "Design notes",
                text: "System: modular grid, editorial spacing.\n\nGoal: keep Napoli’s iconic blue dominant while introducing modern hierarchy for fast scanning on mobile."
            }
        ],
        details: {
            client: "Concept Project",
            year: "2025",
            role: "Graphic Designer, Art Director",
            tools: "Figma, Adobe Photoshop, Adobe Illustrator",
            link: "https://example.com"
        }
    },
    {
        id: 2,
        title: "Fracture Sounds",
        description: "Visual identity and motion design for Fracture Sounds, featuring bespoke release artwork and a multi-directional promotional campaign with custom animations.",
        fullDescription: "Visual identity and motion design for Fracture Sounds. Developed bespoke release artwork for 'String Formations' and 'Moonlight Celeste,' alongside a multi-directional sales campaign for 'Piano Month' featuring custom animations and promotional video content.",
        tags: ["Art Direction", "Social Media"],
        image: "https://via.placeholder.com/800x400?text=Progetto+2",
        date: "2026",
        gallery: [
            { src: "https://via.placeholder.com/600x400?text=Proj2+1", size: "normal" },
            { src: "https://via.placeholder.com/400x400?text=Proj2+2", size: "normal" },
            { src: "https://via.placeholder.com/800x400?text=Proj2+3", size: "wide" }
        ],
        details: {
            client: "Tech Company",
            year: "2026",
            role: "Graphic Designer, Art Director",
            tools: "React, Tailwind",
            link: "https://example.com"
        }
    },
    {
        id: 3,
        title: "Hunder - Brand Identity",
        description: "Brand Identity and Visual Design for a creative agency focused on sports design.",
        fullDescription: "Un approfondimento su come sono state realizzate le animazioni e gli effetti visivi. Tecnologie utilizzate: WebGL, Three.js, GSAP.",
        tags: ["Brand Identity", "Art Direction"],
        image: "https://via.placeholder.com/800x400?text=Progetto+3",
        date: "2026",
        gallery: [
            { src: "https://via.placeholder.com/400x600?text=Creative+1", size: "tall" },
            { src: "https://via.placeholder.com/400x400?text=Creative+2", size: "normal" },
            { src: "https://via.placeholder.com/400x400?text=Creative+3", size: "normal" },
            { src: "https://via.placeholder.com/600x400?text=Creative+4", size: "normal" }
        ],
        details: {
            client: "Creative Studio",
            year: "2026",
            role: "Art Director, Graphic Designer",
            tools: "Figma, Adobe Illustrator",
            link: "https://example.com"
        }
    },
    {
        id: 4,
        title: "Movie Posters",
        description: "A personal collection of alternative and official movie posters, exploring typography, composition, and visual storytelling.",
        fullDescription: "Collection of posters made from 2023. Clients: Spectrum Films, Black Math Pictures.",
        tags: ["Art Direction", "Design"],
        image: "https://via.placeholder.com/800x400?text=Progetto+4",
        date: "2024",
        galleryLayout: [3],
        gallery: [
            { src: "optimized/poster/2001.jpg", size: "normal" },
{ src: "optimized/poster/20012.jpg", size: "normal" },
{ src: "optimized/poster/accattone1.jpg", size: "normal" },
{ src: "optimized/poster/ALIENPOSTER1.jpg", size: "normal" },
{ src: "optimized/poster/apocalypsenow1.jpg", size: "normal" },
{ src: "optimized/poster/apocalypsenow2.jpg", size: "normal" },
{ src: "optimized/poster/apocalypsenow3.jpg", size: "normal" },
{ src: "optimized/poster/asceneatthesea2.jpg", size: "normal" },
{ src: "optimized/poster/ataxidriver3.jpg", size: "normal" },
{ src: "optimized/poster/batman2.jpg", size: "normal" },
{ src: "optimized/poster/blacksunday2.jpg", size: "normal" },
{ src: "optimized/poster/blowout1.jpg", size: "normal" },
{ src: "optimized/poster/burning2.jpg", size: "normal" },
{ src: "optimized/poster/burning3ig.jpg", size: "normal" },
{ src: "optimized/poster/busan2.jpg", size: "normal" },
{ src: "optimized/poster/citizenkane2.jpg", size: "normal" },
{ src: "optimized/poster/citizenkane5.jpg", size: "normal" },
{ src: "optimized/poster/citizenkane7.jpg", size: "normal" },
{ src: "optimized/poster/dune3-min.jpg", size: "normal" },
{ src: "optimized/poster/dune5.jpg", size: "normal" },
{ src: "optimized/poster/dune-messiah.jpg", size: "normal" },
{ src: "optimized/poster/dunkirk.jpg", size: "normal" },
{ src: "optimized/poster/easyrider1.jpg", size: "normal" },
{ src: "optimized/poster/enemy2.jpg", size: "normal" },
{ src: "optimized/poster/fallenangels2.jpg", size: "normal" },
{ src: "optimized/poster/fallenangels3.jpg", size: "normal" },
{ src: "optimized/poster/fitzcarraldo2.jpg", size: "normal" },
{ src: "optimized/poster/fitzcarraldo34.jpg", size: "normal" },
{ src: "optimized/poster/GetOut1.jpg", size: "normal" },
{ src: "optimized/poster/gorgeous3.jpg", size: "normal" },
{ src: "optimized/poster/gorgeousposter2.jpg", size: "normal" },
{ src: "optimized/poster/GT.jpg", size: "normal" },
{ src: "optimized/poster/heatposter.jpg", size: "normal" },
{ src: "optimized/poster/immaculate2-min.jpg", size: "normal" },
{ src: "optimized/poster/immmaculate2.jpg", size: "normal" },
{ src: "optimized/poster/johnwick.jpg", size: "normal" },
{ src: "optimized/poster/joker1.jpg", size: "normal" },
{ src: "optimized/poster/joker2.jpg", size: "normal" },
{ src: "optimized/poster/kidsreturn2.jpg", size: "normal" },
{ src: "optimized/poster/kidsreturn3.jpg", size: "normal" },
{ src: "optimized/poster/kidsreturn5ig.jpg", size: "normal" },
{ src: "optimized/poster/lastrada3.jpg", size: "normal" },
{ src: "optimized/poster/loveexposure3.jpg", size: "normal" },
{ src: "optimized/poster/loveexposure6.jpg", size: "normal" },
{ src: "optimized/poster/manhattan1.jpg", size: "normal" },
{ src: "optimized/poster/manhattan4.jpg", size: "normal" },
{ src: "optimized/poster/midsommar21.jpg", size: "normal" },
{ src: "optimized/poster/Nier_Gianmarco_Malandra.jpg", size: "normal" },
{ src: "optimized/poster/pastlives5.jpg", size: "normal" },
{ src: "optimized/poster/pathsofglory4.jpg", size: "normal" },
{ src: "optimized/poster/persona4.jpg", size: "normal" },
{ src: "optimized/poster/poorthings1.jpg", size: "normal" },
{ src: "optimized/poster/precint133.jpg", size: "normal" },
{ src: "optimized/poster/ragingbull4-min.jpg", size: "normal" },
{ src: "optimized/poster/rashomon3.jpg", size: "normal" },
{ src: "optimized/poster/sacreddeer3-min.jpg", size: "normal" },
{ src: "optimized/poster/sacreeddeer2.jpg", size: "normal" },
{ src: "optimized/poster/sacreeddeer4.jpg", size: "normal" },
{ src: "optimized/poster/saltburn.jpg", size: "normal" },
{ src: "optimized/poster/scream2.jpg", size: "normal" },
{ src: "optimized/poster/screamclean.jpg", size: "normal" },
{ src: "optimized/poster/sevensamurai_jpg.jpg", size: "normal" },
{ src: "optimized/poster/sevensamurai4.jpg", size: "normal" },
{ src: "optimized/poster/shogun1.jpg", size: "normal" },
{ src: "optimized/poster/smashing2.jpg", size: "normal" },
{ src: "optimized/poster/stalker1.jpg", size: "normal" },
{ src: "optimized/poster/stalker3.jpg", size: "normal" },
{ src: "optimized/poster/stalker4.jpg", size: "normal" },
{ src: "optimized/poster/talktomecover.jpg", size: "normal" },
{ src: "optimized/poster/theirishmen.jpg", size: "normal" },
{ src: "optimized/poster/thekiller2.jpg", size: "normal" },
{ src: "optimized/poster/thekiller4.jpg", size: "normal" },
{ src: "optimized/poster/thelast2.jpg", size: "normal" },
{ src: "optimized/poster/thenight1.jpg", size: "normal" },
{ src: "optimized/poster/thenight2ig.jpg", size: "normal" },
{ src: "optimized/poster/thenorthman2.jpg", size: "normal" },
{ src: "optimized/poster/thetrumanshow1.jpg", size: "normal" },
{ src: "optimized/poster/thewitch.jpg", size: "normal" },
{ src: "optimized/poster/twinpeaks2.jpg", size: "normal" },
{ src: "optimized/poster/twinpeaksposter2.jpg", size: "normal" },
{ src: "optimized/poster/whiplash2.jpg", size: "normal" },
{ src: "optimized/poster/zatoichi2.jpg", size: "normal" },
        ],
        details: {
            client: "Concept Project",
            year: "2024",
            role: "Designer, Art Direction",
            tools: "After Photoshop, Adobe Illustrator, Adobe After Effects",
            link: "https://example.com"
        }
    }
];

// Funzione per ottenere un progetto per ID
function getProjectById(id) {
    return projectsData.find(project => project.id === parseInt(id));
}

// Funzione per ottenere tutti i progetti
function getAllProjects() {
    return projectsData;
}
