import { CarProps, FilterProps } from "@/types"

export async function fetchCars(filters: FilterProps) {
	const { manufacturer, year, fuel, limit, model } = filters

	const headers = {
		"X-RapidAPI-Key": process.env.CAR_INFO_API_KEY,
		"X-RapidAPI-Host": process.env.CAR_INFO_API_HOST,
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_CAR_API_ENDPOINT}/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
		{
			headers: headers,
		}
	)

	const result = await response.json()
	return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 50 // Base rental price per day in dollars
	const mileageFactor = 0.1 // Additional rate per mile driven
	const ageFactor = 0.05 // Additional rate per year of vehicle age

	// Calculate additional rate based on mileage and age
	const mileageRate = city_mpg * mileageFactor
	const ageRate = (new Date().getFullYear() - year) * ageFactor

	// Calculate total rental rate per day
	const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

	return rentalRatePerDay.toFixed(0)
}

export const generateCarImgUrl = (car: CarProps, angle?: string) => {
	// const url = new URL("https://cdn.imagin.studio/getimage")
	const url = new URL(process.env.NEXT_PUBLIC_CAR_IMG_API_ENDPOINT)
	const { make, year, model } = car

	url.searchParams.append("customer", process.env.NEXT_PUBLIC_CAR_IMG_API_KEY)
	url.searchParams.append("make", make)
	url.searchParams.append("modelFamily", model.split(" ")[0])
	url.searchParams.append("zoomType", "fullscreen")
	url.searchParams.append("modelYear", `${year}`)
	url.searchParams.append("angle", `${angle}`)

	return `${url}`
}

export const updateSearchParams = (type: string, value: string) => {
	const searchParams = new URLSearchParams(window.location.search)
	searchParams.set(type, value)
	const newPathname = `${window.location.pathname}?${searchParams.toString()}`

	return newPathname
}
