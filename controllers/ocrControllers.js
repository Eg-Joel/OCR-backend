
const Tesseract = require('tesseract.js');

function extractAadhaarInfo(text) {
  const extractedInfo = {};

  const nameRegex = /(?:\n|^)([^\n\d]*)(?:\n.*DOB:|$)/;
  const nameMatch = text.match(nameRegex);
  if (nameMatch) {
    extractedInfo.name = nameMatch[1].trim();
  }

  const dobRegex = /DOB\s*:\s*(\d{2}\/\d{2}\/\d{4})/;
  const dobMatch = text.match(dobRegex);
  if (dobMatch) {
    extractedInfo.dob = dobMatch[1].trim();
  }

  const aadhaarNumberRegex = /(\d{4}\s\d{4}\s\d{4})/;
  const aadhaarNumberMatch = text.match(aadhaarNumberRegex);
  if (aadhaarNumberMatch) {
    extractedInfo.aadhaarNumber = aadhaarNumberMatch[1].trim();
  }

   const genderRegex = /(?:Male|Female)/;
   const genderMatch = text.match(genderRegex);
   if (genderMatch) {
     extractedInfo.gender = genderMatch[0];
   }

   const addressRegex = /Address SRE[\s\S]*?C\/O:[\s\S]*?([^\n]*[\s\S]*?)(Kerala - \d{6})/;
   const addressMatch = text.match(addressRegex);
   if (addressMatch) {
    extractedInfo.address = addressMatch[1].trim();
    extractedInfo.pincode = addressMatch[2].trim();
   }
  
  return extractedInfo;
}
exports.uploadImage = async (req, res, next) => {
  try {
    const results = [];
   
    for (const file of req.files) {
      const {data:{text}} = await Tesseract.recognize(file.path,'eng')
      const extractedInfo = extractAadhaarInfo(text);
      results.push(extractedInfo);
    
  }
    
    res.status(201).json({ data: results })
  } catch (error) {
    next(error);
  }
};

