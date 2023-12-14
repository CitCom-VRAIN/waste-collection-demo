import os
import openrouteservice as ors
from shapely.geometry import Point


class Optimization:
    def optimize(self, locations, vehicles):
        coords = []

        # Transform locations to ORS format
        for coord in locations:
            coords.append([coord["lng"], coord["lat"]])

        # Openroute service API key
        client = ors.Client(key=os.environ.get("OPENROUTESERVICE_API_KEY"))

        # Vehicles start & end position
        vehicle_start_end = [-0.5045224463629362, 39.467567014494584]

        # Create  ORS vehicles. Check optimization parameters at https://github.com/VROOM-Project/vroom/blob/master/docs/API.md
        ors_vehicles = []

        for index, vehicle in enumerate(vehicles):
            ors_vehicles.append(
                ors.optimization.Vehicle(
                    id=index,
                    profile="driving-car",
                    start=[
                        vehicle["marker"]["location"]["lng"],
                        vehicle["marker"]["location"]["lat"],
                    ],
                    end=[
                        vehicle["marker"]["location"]["lng"],
                        vehicle["marker"]["location"]["lat"],
                    ],
                    capacity=[10],
                )
            )

        # Define job
        jobs = [
            ors.optimization.Job(id=index, location=coords, amount=[1])
            for index, coords in enumerate(coords)
        ]

        # Get optimization
        optimized = client.optimization(jobs=jobs, vehicles=ors_vehicles, geometry=True)

        return optimized
