export async function getMockWeather(): Promise<{ temp: number; condition: string }> {
    // Simulate a delay
    await new Promise((res) => setTimeout(res, 500));
    return {
      temp: 30,
      condition: 'Sunny',
    };
  }
  