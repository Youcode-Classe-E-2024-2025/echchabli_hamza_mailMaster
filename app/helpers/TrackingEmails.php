<?php
use GuzzleHttp\Client;

class EmailStatisticsService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = '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';
    }

    public function getEmailStatistics()
    {
        try {
            $response = $this->client->get('https://api.brevo.com/v3/smtp/statistics', [
                'headers' => [
                    'api-key' => $this->apiKey,
                    'Accept' => 'application/json',
                ]
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            return $data; // Return the statistics data

        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
