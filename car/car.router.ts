import * as rest from "restify";
import { Router } from "../common/router";
import { Car } from "./car.model";

class CarRouter extends Router {
	applyRouter(app: rest.Server) {
		app.get("/cars", (req, resp, next) => {
			Car.find()
				.then(cars => {
					resp.json(cars);
					return next();
				})
				.catch(next);
		});

		app.get("/car/:id", (req, resp, next) => {
			Car.findById(req.params.id)
				.then(car => {
					if (car) {
						resp.json(car);
						return next();
					}
					resp.send(404);
					return next();
				})
				.catch(next);
		});

		app.post("/car", (req, resp, next) => {
			let car = new Car(req.body);
			car
				.save()
				.then(car => {
					resp.json(car);
				})
				.catch(next);
			return next();
		});

		app.del("/car/:id", (req, resp, next) => {
			Car.remove({ _id: req.params.id })
				.exec()
				.then(result => {
					if (result.n) {
						resp.send(204);
					} else {
						resp.send(404);
					}
				})
				.catch(next);
		});

		app.patch("/car/:id", (req, resp, next) => {
			const options = { new: true };
			Car.findByIdAndUpdate(req.params.id, req.body, options)
				.then(car => {
					resp.json(car);
					return next();
				})
				.catch(next);
		});

		// app.patch('/car/:id/:quantidade', (req, resp, next) => {
		//     Car.findByIdAndUpdate(req.params.id, {quantidade: req.params.quantidade}).then(car => {
		//         resp.json(car)
		//         return next()
		//     }).catch(next)
		// })
	}
}

export const carRouter = new CarRouter();
