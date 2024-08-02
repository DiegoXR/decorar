  const imagesSizesDataset = [
    {
      // 3:4
      ratio: 0.75,
      supportedSizes: [
        [0.2286, 0.3048],
        [0.3048, 0.4064],
        [0.3810, 0.5080],
        [0.4572, 0.6096],
      ]
    },
    {
       // 4:3
       ratio: 1.33,
       supportedSizes: [
        [0.3048, 0.2286],
        [0.4064, 0.3048],
        [0.5080, 0.3810],
        [0.6096, 0.4572],
       ]
    },
    {
        // 11:14
        ratio: 0.7857,
        supportedSizes: [
         [0.2794, 0.3556],
         [0.5588, 0.7112],
        ]
     },
     {
        // 14:11
        ratio: 0.7857,
        supportedSizes: [
         [0.3556, 0.2794],
         [0.7112, 0.5588],
        ]
     },
     {
        // 2:3
        ratio: 0.66,
        supportedSizes: [
         [0.2032, 0.3048],
         [0.3048, 0.4572],
         [0.4064, 0.6096],
         [0.5080, 0.7620],
         [0.6096, 0.9144],
        ]
     },
     {
        // 3:2
        ratio: 1.5,
        supportedSizes: [
         [0.3048, 0.2032],
         [0.4572, 0.3048],
         [0.6096, 0.4064],
         [0.7620, 0.5080],
         [0.9144, 0.6096],
        ]
     },
     {
        // 4:5
        ratio: 0.8,
        supportedSizes: [
         [0.2032, 0.2540],
         [0.3048, 0.3810],
         [0.4064, 0.5080],
         [0.5080, 0.6350],
         [0.6096, 0.7620],
        ]
     },
     {
      // 5:4
      ratio: 1.25,
      supportedSizes: [
       [0.2540, 0.2032],
       [0.3810, 0.3048],
       [0.5080, 0.4064],
       [0.6350, 0.5080],
       [0.7620, 0.6096],
      ]
    },
    {
      // 1:1
      ratio: 1,
      supportedSizes: [
       [0.2032, 0.2032],
       [0.3048, 0.3048],
       [0.4064, 0.4064],
       [0.5080, 0.5080],
      ]
    },
    {
        // 5:7
        ratio: 0.71,
        supportedSizes: [
         [0.2540, 0.3556],
        ]
    },
    {
        // 7:5
        ratio: 1.4,
        supportedSizes: [
         [0.3556, 0.2540],
        ]
    },
    {
        // 9:16
        ratio: 0.5625,
        supportedSizes: [
         [0.4572, 0.8128],
        ]
    },
  ];

  const backupSizeDataset = 
    {
        ratio: 0,
        supportedSizes: [
          [0.2286, 0],
          [0.3048, 0],
          [0.3810, 0],
          [0.4572, 0],
          [0.5080, 0],
          [0.6096, 0],
          [0.7112, 0],
          [0.9144, 0],
        ]
    }
  

// Function to find the supported sizes based on the image ratio
  /**
 * @param {number} ratio
 */
  export function getSupportedSizes(ratio) {
    let closest = imagesSizesDataset[0];
    let minDiff = Math.abs(ratio - imagesSizesDataset[0].ratio);

    for (let i = 1; i < imagesSizesDataset.length; i++) {
      let currentDiff = Math.abs(ratio - imagesSizesDataset[i].ratio);
      if (currentDiff < minDiff) {
        closest = imagesSizesDataset[i];
        minDiff = currentDiff;
      }
    }

    if (minDiff > 1.0){
        return backupSizeDataset.supportedSizes.map(size => [size[0], size[1] * ratio ])
    }else{

        console.log(`Image ratio is ${ratio} and the equivalent ratio is ${closest.ratio} supported sizes found ${closest.supportedSizes}`);
        return closest.supportedSizes;
    }   
  }


  
