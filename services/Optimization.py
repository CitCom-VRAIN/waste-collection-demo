import os
import openrouteservice as ors

class Optimization:
    def optimize(self, locations, vehicles, end_location):
        coords = []
        # Transform locations to ORS format
        for coord in locations:
            coords.append([coord["lng"], coord["lat"]])

        # Openroute service API key
        client = ors.Client(key=os.environ.get("OPENROUTESERVICE_API_KEY"))

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
                        end_location["lng"],
                        end_location["lat"],
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
        try:
            optimized = client.optimization(
                jobs=jobs, vehicles=ors_vehicles, geometry=True
            )
        except Exception as error:
            # APIException to string
            error_string = str(error)
            
            # Adapt string to JSON format
            error = (
                "{"
                + error_string[error_string.find("{") + 1 : error_string.find("}")]
                + "}"
            ).replace("'", '"')

            # Return error
            return error

        else:
            return optimized
