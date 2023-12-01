import os
import openrouteservice as ors
from shapely.geometry import Point


class Optimization:
    def optimize(self, coords):
        # coords = []

        # for container in data:
        #     # Discard containers with null location values
        #     if "location" in container and container["location"]["value"] is not None:
        #         # Create point from container location
        #         #point = Point(container["location"]["value"]["coordinates"])
        #         # Check if the container is within target polygon
        #         coords.append(container["location"]["value"]["coordinates"])

        # Openroute service API key
        client = ors.Client(key=os.environ.get("OPENROUTESERVICE_API_KEY"))

        # Vehicles start & end position
        vehicle_start_end = [-0.5045224463629362, 39.467567014494584]

        # Define 2 vehicles. Check optimization parameters at https://github.com/VROOM-Project/vroom/blob/master/docs/API.md
        vehicles = [
            ors.optimization.Vehicle(
                id=0,
                profile="driving-car",
                start=vehicle_start_end,
                end=vehicle_start_end,
                capacity=[10],
            ),
            ors.optimization.Vehicle(
                id=1,
                profile="driving-car",
                start=vehicle_start_end,
                end=vehicle_start_end,
                capacity=[10],
            ),
        ]

        # Define job
        jobs = [
            ors.optimization.Job(id=index, location=coords, amount=[1])
            for index, coords in enumerate(coords)
        ]

        # Get optimization
        optimized = client.optimization(jobs=jobs, vehicles=vehicles, geometry=True)

        return optimized
