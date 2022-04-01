<?php

declare(strict_types=1);

/*
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Model;

use App\Model\Payload\FeaturesPayload;
use App\Model\Payload\HeaderPayload;
use App\Model\Payload\UserPayload;
use Lcobucci\JWT\Token\RegisteredClaims;

final class JWTToken
{
    private ?string $iss;
    private ?string $aud;
    private ?string $sub;
    private ?string $room;
    private ?FeaturesPayload $features;
    private ?\DateTimeImmutable $nbf;
    private ?UserPayload $user;
    private ?HeaderPayload  $headerPayload;

    public function __construct(
        string $iss,
        string $aud,
        string $sub,
        string $room,
        UserPayload $user,
        ?\DateTimeImmutable $nbf,
        ?HeaderPayload $headerPayload,
        ?FeaturesPayload $featuresPayload
    ) {
        $this->iss = $iss;
        $this->aud = $aud;
        $this->sub = $sub;
        $this->room = $room;
        $this->user = $user;
        $this->nbf = $nbf;
        $this->headerPayload = $headerPayload;
        $this->features = $featuresPayload;
    }

    public function getHeaderPayload(): ?HeaderPayload
    {
        return $this->headerPayload;
    }

    /** @return array<string, array<string, string|array<string, mixed>>|string|null> */
    public function toArray(): array
    {
        $arrayResponse = [
            RegisteredClaims::ISSUER => $this->iss,
            RegisteredClaims::AUDIENCE => $this->aud,
            RegisteredClaims::SUBJECT => $this->sub,
            'room' => $this->room,
            'context' => [
                'user' => null !== $this->user ? $this->user->toArray() : '',
            ],
        ];

        if (null !== $this->nbf) {
            $arrayResponse[RegisteredClaims::NOT_BEFORE] = $this->nbf;
        }

        if (null !== $this->features) {
            $arrayResponse['context']['features'] = $this->features->toArray();
        }

        return $arrayResponse;
    }
}
