<?php
$i = 0;
while($f = trim(fgets(STDIN))){
    if ($i == 0) {
        $n = $f;
    }
    elseif ($i <= $n) {
        list($pl, $time) = explode(' ', $f);
        $places[$pl] = $time;
    } else {
        list($pl_post, $time_post) = explode(' ', $f);
        $gmt_post = setTime($time_post, $places[$pl_post]);
        foreach ($places as $pl => $time) {
            $r = setTime($gmt_post, $time);
            echo $r . "\n";
        }
    }
    $i++;
}
function setTime($time_post, $time) {
    list($h, $m) = explode(':', $time_post);
    $h += $time;
    if ($h >= 24) {
        $h -= 24;
    } elseif ($h < 0) {
        $h = 24 - abs($h);
    }
    $h = sprintf('%02d', $h);
    return $h . ':' . $m;
}