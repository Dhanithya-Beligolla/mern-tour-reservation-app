const Package = require('../models/Package');

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
};

exports.createPackage = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newPackage = new Package({ name, price, description });
    await newPackage.save();
    res.json(newPackage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create package' });
  }
};
exports.getPackageById = async (req, res) => {
    try {
      const package = await Package.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json(package);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };