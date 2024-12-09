/**
 *  category controller
 */

import { factories } from "@strapi/strapi";
import { Context } from "koa"; // Importing the Koa context type to ensure proper type checking

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async find(ctx: Context) {
      const { user } = ctx.state;

      if (!user) {
        return ctx.unauthorized(
          "You must be logged in to access this resource"
        );
      }

      const { user_type } = user;
      //   console.log("context query looks like", ctx);
      console.log(`user_role is ${user_type}`);

      if (user_type === "english_viewer") {
        console.log("enlighs_viewer context query looks like", ctx.query);

        ctx.query = {
          ...ctx.query,
          filters: {
            ...(ctx.query || {}),
            locale: "en",
          },
        };
        console.log("after enlighs_viewer context query looks like", ctx.query);

        // ctx.query = {
        //   ...ctx.query,
        //   filters: {
        //     ...(ctx.query.filters || {}), // Ensure filters is an object, fallback to empty if undefined
        //     locale: "en",
        //   },
        // };
      } else if (user_type === "nepali_viewer") {
        ctx.query = {
          ...ctx.query,
          filters: {
            ...(ctx.query || {}),
            locale: "ne",
          },
        };
      } else {
        return ctx.forbidden(
          "You do not have the required permissions to access this content."
        );
      }

      return await super.find(ctx);
    },

    // async findOne(ctx: Context) {
    //   const { user } = ctx.state;

    //   if (!user) {
    //     return ctx.unauthorized("You must be logged in to access this resource");
    //   }

    //   const { user_role } = user;

    //   if (user_role === "english_viewer") {
    //     ctx.query = {
    //       ...ctx.query,
    //       filters: {
    //         ...(ctx.query.filters || {}),
    //         locale: "en",
    //       },
    //     };
    //   } else if (user_role === "nepali_viewer") {
    //     ctx.query = {
    //       ...ctx.query,
    //       filters: {
    //         ...(ctx.query.filters || {}),
    //         locale: "ne",
    //       },
    //     };
    //   } else {
    //     return ctx.forbidden("You do not have the required permissions to access this content.");
    //   }

    //   return await super.findOne(ctx);
    // },

    // async create(ctx: Context) {
    //   const { user } = ctx.state;

    //   if (!user) {
    //     return ctx.unauthorized("You must be logged in to access this resource");
    //   }

    //   const { user_role } = user;

    //   // Automatically set the locale based on the user's role
    //   if (user_role === "english_viewer") {
    //     ctx.request.body.data.locale = "en";
    //   } else if (user_role === "nepali_viewer") {
    //     ctx.request.body.data.locale = "ne";
    //   } else {
    //     return ctx.forbidden("You do not have the required permissions to create this content.");
    //   }

    //   return await super.create(ctx);
    // },

    // async update(ctx: Context) {
    //   const { user } = ctx.state;

    //   if (!user) {
    //     return ctx.unauthorized("You must be logged in to access this resource");
    //   }

    //   const { user_role } = user;

    //   if (user_role === "english_viewer") {
    //     ctx.query = {
    //       ...ctx.query,
    //       filters: {
    //         ...(ctx.query.filters || {}),
    //         locale: "en",
    //       },
    //     };
    //   } else if (user_role === "nepali_viewer") {
    //     ctx.query = {
    //       ...ctx.query,
    //       filters: {
    //         ...(ctx.query.filters || {}),
    //         locale: "ne",
    //       },
    //     };
    //   } else {
    //     return ctx.forbidden("You do not have the required permissions to update this content.");
    //   }

    //   return await super.update(ctx);
    // },

    // async delete(ctx: Context) {
    //   const { user } = ctx.state;

    //   if (!user) {
    //     return ctx.unauthorized("You must be logged in to access this resource");
    //   }

    //   const { user_role } = user;

    //   if (user_role === "english_viewer") {
    //     ctx.query = {
    //       ...ctx.query,
    //       filters: {
    //         ...(ctx.query.filters || {}),
    //         locale: "en",
    //       },
    //     };
    //   } else if (user_role === "nepali_viewer") {
    //     ctx.query = {
    //       ...ctx.query,
    //       filters: {
    //         ...(ctx.query.filters || {}),
    //         locale: "ne",
    //       },
    //     };
    //   } else {
    //     return ctx.forbidden("You do not have the required permissions to delete this content.");
    //   }

    //   return await super.delete(ctx);
    // },
  })
);
