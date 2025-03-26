export default function handler(req, res) {
    const OrganizeData = [
      {
        id: 1,
        name: "Earrings",
        keywords: ["Earrings", "Jewelry", "Accessories", "Earring", "Studs"],
        imageSrc: "/Organize1.jpg",
        description: "How to store accessories and jewelry properly.",
        details: [
          "✔️ Sort by type, such as necklaces, rings, earrings, to keep everything organized.",
          "✔️ Use divided boxes, ziplock bags, hooks, or trays for easy access.",
          "✔️ Keep frequently used items within reach and store less-used items in closed containers."
        ],
        diyIdeas: [
          "Repurpose shoe boxes or egg cartons as storage containers.",
          "Hang necklaces using a clothing hanger or wire mesh.",
          "Store earrings or hairpins in small cups or jars."
        ]
      },
      {
        id: 2,
        name: "Shirt",
        keywords: ["Shirt", "T-shirt", "Clothes", "Top", "Tee"],
        imageSrc: "/images/shirt.jpg",
        description: "Fold shirts neatly for easy access.",
        details: [
          "✔️ Use vertical folding to save space.",
          "✔️ Store by color to make selection easier.",
          "✔️ Use drawer organizers for better arrangement."
        ],
        diyIdeas: [
          "Use old shoeboxes as dividers.",
          "Roll up shirts instead of folding for more space.",
          "Use vacuum bags for seasonal clothes."
        ]
      },
      {
        id: 3,
        name: "Pants",
        keywords: ["Pants", "Trousers", "Jeans", "Bottoms", "Slacks"],
        imageSrc: "/images/pants.jpg",
        description: "Store pants in drawers or hanging organizers.",
        details: [
          "✔️ Use drawer dividers to keep pants neatly stacked.",
          "✔️ Hang dress pants on clip hangers to prevent wrinkles.",
          "✔️ Fold casual pants and stack them in an accessible area."
        ],
        diyIdeas: [
          "Use S-shaped hangers to store multiple pants in one space.",
          "Label storage bins for different types of pants.",
          "Keep jeans stacked vertically for easy access."
        ]
      },
      {
        id: 4,
        name: "Underwear",
        keywords: ["Underwear", "Briefs", "Lingerie", "Panties", "Boxers"],
        imageSrc: "/images/underwear.jpg",
        description: "Keep underwear organized with small compartments.",
        details: [
          "✔️ Use soft bins to separate different types of underwear.",
          "✔️ Sort by category, such as bras, briefs, and socks.",
          "✔️ Store everyday items in the front and less-used ones in the back."
        ],
        diyIdeas: [
          "Use a hanging organizer for extra storage.",
          "Fold underwear neatly instead of rolling.",
          "Use labeled boxes to separate categories."
        ]
      },
      {
        id: 5,
        name: "Skirt",
        keywords: ["Skirt", "Dress", "Mini Skirt", "Midi Skirt", "Maxi Skirt"],
        imageSrc: "/images/skirt.jpg",
        description: "Hang skirts using clips for better storage.",
        details: [
          "✔️ Use non-slip hangers to keep skirts in place.",
          "✔️ Fold skirts carefully when storing in drawers.",
          "✔️ Keep delicate skirts in garment bags."
        ],
        diyIdeas: [
          "Use binder clips on regular hangers for skirts.",
          "Stack skirts vertically in drawers to save space.",
          "Use vacuum bags for out-of-season skirts."
        ]
      },
      {
        id: 6,
        name: "Shoes",
        keywords: ["Shoes", "Footwear", "Sneakers", "Boots", "Heels"],
        imageSrc: "/images/shoes.jpg",
        description: "Store shoes properly to maintain their shape.",
        details: [
          "✔️ Use a shoe rack or hanging organizer to save space.",
          "✔️ Keep frequently worn shoes near the entrance.",
          "✔️ Store seasonal shoes in boxes or under-bed containers."
        ],
        diyIdeas: [
          "Use PVC pipes to create a DIY shoe organizer.",
          "Repurpose cardboard boxes as stackable shoe storage.",
          "Use old wine crates to store and display shoes stylishly."
        ]
      },
      {
        id: 7,
        name: "Hats",
        keywords: ["Hat", "Caps", "Beanies", "Headwear", "Snapback"],
        imageSrc: "/images/hats.jpg",
        description: "Keep hats in good condition by storing them properly.",
        details: [
          "✔️ Store hats on hooks or shelves to maintain their shape.",
          "✔️ Use a hat organizer or stack them inside a drawer.",
          "✔️ Keep hats away from direct sunlight to prevent fading."
        ],
        diyIdeas: [
          "Use shower curtain rings on a hanger to store hats.",
          "Repurpose old baskets for hat storage.",
          "Use adhesive hooks on walls for easy access."
        ]
      },
      {
        id: 8,
        name: "Bags",
        keywords: ["Bag", "Handbag", "Backpack", "Purse", "Tote"],
        imageSrc: "/images/bags.jpg",
        description: "Store bags properly to maintain their shape and longevity.",
        details: [
          "✔️ Use shelf dividers to keep bags upright.",
          "✔️ Stuff bags with paper or bubble wrap to keep their shape.",
          "✔️ Store bags in dust bags when not in use."
        ],
        diyIdeas: [
          "Use magazine holders as bag organizers.",
          "Hang bags on wall hooks or a pegboard.",
          "Repurpose a shoe rack for bag storage."
        ]
      },
      {
        id: 9,
        name: "Socks",
        keywords: ["Socks", "Stockings", "Ankle Socks", "Knee-high Socks", "Tights"],
        imageSrc: "/images/socks.jpg",
        description: "Store socks neatly for easy access.",
        details: [
          "✔️ Use drawer dividers to separate different types of socks.",
          "✔️ Roll socks instead of folding to save space.",
          "✔️ Keep seasonal socks in separate storage bins."
        ],
        diyIdeas: [
          "Use PVC pipes as a sock divider in drawers.",
          "Repurpose old jars to store socks.",
          "Use hanging shoe organizers for sock storage."
        ]
      },
      {
        id: 10,
        name: "Blankets",
        keywords: ["Blanket", "Throw", "Quilt", "Comforter", "Bedding"],
        imageSrc: "/images/blankets.jpg",
        description: "Store blankets properly to keep them fresh and accessible.",
        details: [
          "✔️ Fold blankets neatly and stack them in a closet.",
          "✔️ Use vacuum storage bags for extra space-saving.",
          "✔️ Store frequently used blankets in a basket or on a blanket ladder."
        ],
        diyIdeas: [
          "Repurpose an old ladder as a blanket holder.",
          "Use an ottoman with hidden storage for blankets.",
          "Store blankets in decorative baskets for easy access."
        ]
      }
    ];
  
    res.status(200).json(OrganizeData);
  }
  