import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const useInfiniteScrolling = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [comments, setComments] = useState([]);
	const [hasMore, setHasmore] = useState(false);
};
