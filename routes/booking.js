const Booking = require("../routes/venues");
const { transformBooking, transformvenues } = require("./users");
const venues = require("../routes/venues");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User is not authorized to create event");
    }
    try {
      const bookings = await Booking.find({user: req.userId});
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User is not authorised to create venues");
    }
    const fetchedvenues = await venues.findOne({ _id: args.venuesId });
    const booking = new Booking({
      user: req.userId,
      venues: fetchedvenues
    });
    const result = await booking.save();
    return transformBooking(result);
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User is not authorised to create venues");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("venues");
      const event = transformvenues(booking.venues);
      await Booking.deleteOne({ _id: args.bookingId });
      return venues;
    } catch (err) {
      throw err;
    }
  }
};