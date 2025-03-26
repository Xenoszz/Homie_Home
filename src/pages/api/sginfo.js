export default function handler(req, res) {
    const spaceGuideData = [
      {
        title: "Dormitory",
        description: "Require space: 200 x 200 m3",
        imageSrc: "/Card.jpg",
        arrangement: ["Bed – Position for space efficiency.", "Desk – Near window for natural light."],
        tips: ["Use foldable furniture.", "Install wall shelves to save space."]
      },
      {
        title: "Minimalist Living",
        description: "Require space: 150 x 180 m3",
        imageSrc: "/Card1.jpg",
        arrangement: ["Multi-functional furniture.", "Minimal decor for a clean look."],
        tips: ["Keep color tones light.", "Use vertical storage."]
      },
      {
        title: "Workspace",
        description: "Require space: 100 x 120 m3",
        imageSrc: "/Card2.jpg",
        arrangement: ["Ergonomic chair & desk setup.", "Good lighting for productivity."],
        tips: ["Use cable management solutions.", "Add greenery for a fresh feel."]
      },
      {
        title: "Luxury Suite",
        description: "Require space: 300 x 300 m3",
        imageSrc: "/Card3.jpg",
        arrangement: ["King-size bed in the center.", "Walk-in closet for organized storage."],
        tips: ["Use warm lighting.", "Add soft textiles for a cozy feel."]
      },
      {
        title: "Compact Studio",
        description: "Require space: 120 x 140 m3",
        imageSrc: "/Card4.jpg",
        arrangement: ["Loft bed to maximize space.", "Foldable dining table."],
        tips: ["Use mirrors to create an illusion of space.", "Opt for multi-purpose furniture."]
      },
      {
        title: "Industrial Loft",
        description: "Require space: 180 x 220 m3",
        imageSrc: "/Card5.jpg",
        arrangement: ["Open space with minimal partitions.", "Exposed brick walls for aesthetics."],
        tips: ["Mix metal and wood for a stylish look.", "Use large windows for natural light."]
      }
    ];

    console.log(spaceGuideData); // ✅ ตรวจสอบว่าข้อมูลครบไหม
    res.status(200).json(spaceGuideData);
}
