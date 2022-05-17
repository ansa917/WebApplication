module.exports = {
    events: async () => {
      try {
        const venues = await venues.find();
        return venues.map(event => {
        
          return transformveneus(venues);
        });
      } catch (err) {
        throw err;
      }
    },
  
    //this will take in the args passed when creating the schema.
    createvenues: async (args, req) => {
      if (!req.isAuth) {
        throw new Error(" User can't access to following page");
      }
  
      const venues = new venues({
        title: args.venuesInput.title,
        description: args.venuesInput.description,
        price: +args.venuesInput.price,
        date: dateToString(args.venuesInput.date),
        //mongoose will store automatically an objectId, only need to pass in a string:
        creator: req.userId
      });
  
      let createdEvent;
  
      try {
        
        const result = await venues.save();
  
        createdEvent = transformveneus(result);
        const creator = await User.findById(req.userId);
  
        if (!creator) {
          throw new Error("User not found.");
        }
        //I need to pass in the id, however I can pass the entire event object and mongoose will handle the id.
        creator.createdvenues.push(veneus);
        //this will update the user in the DB:
        await creator.save();
  
        return createdvenues;
      } catch (err) {
        throw err;
      }
    }
  };